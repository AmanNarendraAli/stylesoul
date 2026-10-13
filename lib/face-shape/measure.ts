/**
 * Face proportions from the 478-point FaceLandmarker mesh, as two 0–1
 * positions for the profile spectrums:
 *
 * - length: face height (mid-forehead to chin) over cheekbone width.
 *   Compact faces sit low, long faces high.
 * - lines: how straight the jaw contour runs at the jaw corner (the angle at
 *   the jaw point between the side of the face and the jaw towards the chin).
 *   Fuller, rounder contours bend there and sit low ("curved"); leaner
 *   contours run straighter and sit high ("straight").
 *
 * Both use 3D landmark distances to soften small head turns. The 0–1 range
 * spans the 5th–95th percentile of frontal, mouth-closed faces in the
 * calibration photos (calibration/scripts/face_shape.ts), and the category
 * bounds are that set's tertiles. Same-person repeatability across photos
 * is moderate (intraclass correlation ≈0.6), so the categories are styling
 * rules of thumb, not facts about a face.
 */

export type Point3 = { x: number; y: number; z?: number };

/** 0–1 positions; see the module comment. */
export type FaceShape = { length: number; lines: number };

export type FaceLength = "compact" | "balanced" | "long";
export type FaceLines = "curved" | "balanced" | "straight";

const FOREHEAD = 10;
const CHIN = 152;
const CHEEK_LEFT = 234;
const CHEEK_RIGHT = 454;
const NOSE_TIP = 1;
const EYE_OUTER_LEFT = 33;
const EYE_OUTER_RIGHT = 263;
const LIP_UPPER = 13;
const LIP_LOWER = 14;
// Jaw point with the face-side point above it and the jaw point below it.
const JAW_CORNERS = [
  [93, 58, 136],
  [323, 288, 365],
] as const;

// Percentiles of the raw measures (see the module comment).
const LENGTH_RANGE = [1.04, 1.324] as const;
const LENGTH_TERTILES = [1.168, 1.234] as const;
const LINES_RANGE = [145.5, 156.2] as const;
const LINES_TERTILES = [149.8, 152.7] as const;

// Pose and expression limits; the camera guidance enforces the same pose.
const MAX_YAW = 0.1;
const MAX_ROLL_DEG = 10;
const NOSE_DROP = [0.44, 0.6] as const;
const MAX_MOUTH_GAP = 0.05;

/**
 * Measures a face, or returns undefined when the head is turned or tilted or
 * the mouth is open, since both change the outline.
 * `width` and `height` are the image's pixel size: landmarks are normalised
 * per axis, and z is on the x scale.
 */
export function measureFace(
  landmarks: Point3[],
  width: number,
  height: number,
): FaceShape | undefined {
  if (landmarks.length < 468) return undefined;
  const p = landmarks.map(({ x, y, z = 0 }) => [x * width, y * height, z * width]);
  const faceWidth = distance(p[CHEEK_LEFT], p[CHEEK_RIGHT]);

  const yaw = Math.abs(p[NOSE_TIP][0] - (p[CHEEK_LEFT][0] + p[CHEEK_RIGHT][0]) / 2) / faceWidth;
  const roll = Math.abs(
    (Math.atan2(
      p[EYE_OUTER_RIGHT][1] - p[EYE_OUTER_LEFT][1],
      p[EYE_OUTER_RIGHT][0] - p[EYE_OUTER_LEFT][0],
    ) * 180) / Math.PI,
  );
  const drop = (p[NOSE_TIP][1] - p[FOREHEAD][1]) / (p[CHIN][1] - p[FOREHEAD][1]);
  const mouthGap = Math.hypot(p[LIP_UPPER][0] - p[LIP_LOWER][0], p[LIP_UPPER][1] - p[LIP_LOWER][1]) / faceWidth;
  if (
    yaw > MAX_YAW ||
    roll > MAX_ROLL_DEG ||
    drop < NOSE_DROP[0] ||
    drop > NOSE_DROP[1] ||
    mouthGap >= MAX_MOUTH_GAP
  ) {
    return undefined;
  }

  const raw = rawMeasures(p);
  return {
    length: position(raw.length, LENGTH_RANGE),
    lines: position(raw.lines, LINES_RANGE),
  };
}

/** The unscaled measures, exported for calibration. */
export function rawMeasures(p: number[][]) {
  const lines =
    JAW_CORNERS.reduce((sum, [above, corner, below]) => sum + angle(p[above], p[corner], p[below]), 0) /
    JAW_CORNERS.length;
  return { length: distance(p[FOREHEAD], p[CHIN]) / distance(p[CHEEK_LEFT], p[CHEEK_RIGHT]), lines };
}

export function faceLength(shape: FaceShape): FaceLength {
  return category(shape.length, LENGTH_RANGE, LENGTH_TERTILES, ["compact", "balanced", "long"]);
}

export function faceLines(shape: FaceShape): FaceLines {
  return category(shape.lines, LINES_RANGE, LINES_TERTILES, ["curved", "balanced", "straight"]);
}

function category<T>(
  value: number,
  range: readonly [number, number],
  tertiles: readonly [number, number],
  [low, middle, high]: [T, T, T],
): T {
  if (value < position(tertiles[0], range)) return low;
  if (value > position(tertiles[1], range)) return high;
  return middle;
}

function position(value: number, [low, high]: readonly [number, number]) {
  return Math.min(1, Math.max(0, (value - low) / (high - low)));
}

function distance(a: number[], b: number[]) {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

/** Angle at b, in degrees. */
function angle(a: number[], b: number[], c: number[]) {
  const u = [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const v = [c[0] - b[0], c[1] - b[1], c[2] - b[2]];
  const cos = (u[0] * v[0] + u[1] * v[1] + u[2] * v[2]) / (Math.hypot(...u) * Math.hypot(...v));
  return (Math.acos(Math.min(1, Math.max(-1, cos))) * 180) / Math.PI;
}
