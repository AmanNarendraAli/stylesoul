import { rgbToLab, type Lab } from "./colour.ts";
import { median } from "./features.ts";
import {
  FACE_LEFT,
  FACE_RIGHT,
  LEFT_CHEEK,
  RIGHT_CHEEK,
  faceWidthPx,
  sampleSkin,
  type PixelSource,
  type Point,
} from "./regions.ts";

/**
 * Live guidance for in-app camera capture. Given one (downscaled, unmirrored)
 * video frame and its face landmarks, return the single most important thing
 * the user should fix before we take the photo.
 *
 * Pure and browser-free. Every threshold below is a hand-tuned heuristic, not
 * a calibrated value.
 */

export type CaptureIssueReason =
  | "no_face"
  | "multiple_faces"
  | "too_far"
  | "too_close"
  | "off_centre"
  | "head_turned"
  | "head_tilted"
  | "chin_up"
  | "chin_down"
  | "mouth_open"
  | "too_dark"
  | "too_bright"
  | "uneven_light"
  | "colour_cast";

export type CaptureGuidance = {
  ready: boolean;
  issue?: { reason: CaptureIssueReason; message: string };
};

const NOSE_TIP = 1;
const FOREHEAD = 10;
const CHIN = 152;
const EYE_OUTER_LEFT = 33;
const EYE_OUTER_RIGHT = 263;
const LIP_UPPER = 13;
const LIP_LOWER = 14;

const MIN_FACE_WIDTH = 0.3; // face narrower than this fraction of the frame → too few skin pixels
const MAX_FACE_WIDTH = 0.75; // wider than this and the face edges and hair fall out of frame
const MAX_CENTRE_OFFSET = 0.15; // face centre may drift this far (fraction of frame) from the middle
const MAX_YAW = 0.1; // nose offset from the cheek midpoint, as a fraction of face width (~10°)
const MAX_ROLL_DEG = 10; // eye-corner line angle from horizontal
const MIN_NOSE_DROP = 0.44; // nose tip position between forehead (0) and chin (1); below → chin up
const MAX_NOSE_DROP = 0.6; // above → chin down
const MAX_MOUTH_GAP = 0.05; // lip gap over face width; an open mouth changes the face outline (see lib/face-shape/measure.ts)
const MIN_SKIN_L = 20; // a little stricter than the quality gate (15) so captures clear it
const MAX_SKIN_L = 90; // a little stricter than the quality gate (95)
const MAX_CHEEK_L_DIFF = 12; // L* gap between cheeks that signals side lighting
const MAX_CAST_CHROMA = 20; // chroma of the median background colour; warm bulbs sit well above
const BACKGROUND_STRIDE = 4; // sample every Nth pixel of the background
const FACE_BOX_GROWTH = 1.3; // grow the face box before excluding it, to skip hair and neck

export function assessCaptureFrame(
  source: PixelSource,
  landmarks: Point[],
  faceCount: number,
): CaptureGuidance {
  if (faceCount === 0 || landmarks.length === 0) {
    return issue("no_face", "We can't see your face yet. Look straight at the camera.");
  }
  if (faceCount > 1) {
    return issue("multiple_faces", "Make sure only your face is in the frame.");
  }

  const width = faceWidthPx(source, landmarks);
  const widthFraction = width / source.width;
  if (widthFraction < MIN_FACE_WIDTH) {
    return issue("too_far", "Move a little closer so your face fills the oval.");
  }
  if (widthFraction > MAX_FACE_WIDTH) {
    return issue("too_close", "Move back a little. Your face is too close.");
  }

  const left = landmarks[FACE_LEFT];
  const right = landmarks[FACE_RIGHT];
  const top = landmarks[FOREHEAD];
  const chin = landmarks[CHIN];
  const centreX = (left.x + right.x) / 2;
  const centreY = (top.y + chin.y) / 2;
  if (
    Math.abs(centreX - 0.5) > MAX_CENTRE_OFFSET ||
    Math.abs(centreY - 0.5) > MAX_CENTRE_OFFSET
  ) {
    return issue("off_centre", "Move so your face sits in the middle of the oval.");
  }

  // In an unmirrored frame the subject's left is on the image right, so a nose
  // pointing image-right means they have turned to their left.
  const yaw = ((landmarks[NOSE_TIP].x - centreX) * source.width) / width;
  if (yaw > MAX_YAW) {
    return issue("head_turned", "Turn your head slightly to your right to face the camera.");
  }
  if (yaw < -MAX_YAW) {
    return issue("head_turned", "Turn your head slightly to your left to face the camera.");
  }

  const eyeLeft = landmarks[EYE_OUTER_LEFT];
  const eyeRight = landmarks[EYE_OUTER_RIGHT];
  const roll =
    (Math.atan2(
      (eyeRight.y - eyeLeft.y) * source.height,
      (eyeRight.x - eyeLeft.x) * source.width,
    ) *
      180) /
    Math.PI;
  if (Math.abs(roll) > MAX_ROLL_DEG) {
    return issue("head_tilted", "Keep your head level. Try not to tilt it to one side.");
  }

  const noseDrop = (landmarks[NOSE_TIP].y - top.y) / (chin.y - top.y);
  if (noseDrop < MIN_NOSE_DROP) {
    return issue("chin_up", "Lower your chin slightly.");
  }
  if (noseDrop > MAX_NOSE_DROP) {
    return issue("chin_down", "Lift your chin slightly.");
  }

  const mouthGap =
    Math.hypot(
      (landmarks[LIP_UPPER].x - landmarks[LIP_LOWER].x) * source.width,
      (landmarks[LIP_UPPER].y - landmarks[LIP_LOWER].y) * source.height,
    ) / width;
  if (mouthGap >= MAX_MOUTH_GAP) {
    return issue("mouth_open", "Close your mouth and relax your face.");
  }

  const skinL = medianL(sampleSkin(source, landmarks));
  if (skinL < MIN_SKIN_L) {
    return issue("too_dark", "It's too dark. Move closer to a window with daylight.");
  }
  if (skinL > MAX_SKIN_L) {
    return issue("too_bright", "It's too bright. Step out of direct sun or away from the lamp.");
  }

  const cheekDiff =
    medianL(sampleSkin(source, landmarks, undefined, LEFT_CHEEK)) -
    medianL(sampleSkin(source, landmarks, undefined, RIGHT_CHEEK));
  if (Math.abs(cheekDiff) > MAX_CHEEK_L_DIFF) {
    return issue(
      "uneven_light",
      "Light is hitting one side of your face. Turn to face the window.",
    );
  }

  const background = sampleBackground(source, landmarks);
  if (background.length > 0) {
    const a = median(background.map((s) => s.a));
    const b = median(background.map((s) => s.b));
    if (Math.hypot(a, b) > MAX_CAST_CHROMA) {
      return issue(
        "colour_cast",
        b > Math.abs(a)
          ? "This light is very warm. Daylight from a window works best."
          : "This light is strongly coloured. Daylight from a window works best.",
      );
    }
  }

  return { ready: true };
}

function issue(reason: CaptureIssueReason, message: string): CaptureGuidance {
  return { ready: false, issue: { reason, message } };
}

function medianL(samples: Lab[]): number {
  return samples.length > 0 ? median(samples.map((s) => s.l)) : 0;
}

/** Frame pixels outside the (grown) face bounding box. */
function sampleBackground(source: PixelSource, landmarks: Point[]): Lab[] {
  const xs = landmarks.map((p) => p.x * source.width);
  const ys = landmarks.map((p) => p.y * source.height);
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
  const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  const halfW = ((Math.max(...xs) - Math.min(...xs)) / 2) * FACE_BOX_GROWTH;
  const halfH = ((Math.max(...ys) - Math.min(...ys)) / 2) * FACE_BOX_GROWTH;
  const samples: Lab[] = [];
  for (let y = 0; y < source.height; y += BACKGROUND_STRIDE) {
    for (let x = 0; x < source.width; x += BACKGROUND_STRIDE) {
      if (Math.abs(x - cx) <= halfW && Math.abs(y - cy) <= halfH) continue;
      samples.push(rgbToLab(source.getPixel(x, y)));
    }
  }
  return samples;
}
