import { rgbToLab, type Lab, type Rgb } from "./colour.ts";

/**
 * Region sampling. Given a face's landmarks and a pixel source, collect the
 * pixels that belong to the skin / iris / hair regions. Coordinates follow
 * MediaPipe's convention: normalised [0,1] landmark points over the 478-point
 * FaceLandmarker mesh (iris points 468–477 included).
 */

export type Point = { x: number; y: number };

export type PixelSource = {
  width: number;
  height: number;
  /** RGB at integer pixel (x,y); callers guarantee in-bounds. */
  getPixel: (x: number, y: number) => Rgb;
};

/** Hair-segmenter confidence (0–1) at integer pixel (x,y) of the same image. */
export type HairMask = (x: number, y: number) => number;

export function pixelSourceFromRgba(
  data: ArrayLike<number>,
  width: number,
  height: number,
): PixelSource {
  return {
    width,
    height,
    getPixel: (x, y) => {
      const i = (y * width + x) * 4;
      return { r: data[i], g: data[i + 1], b: data[i + 2] };
    },
  };
}

// Cheek points by image side (an unmirrored photo shows the subject's right
// cheek on the left).
export const LEFT_CHEEK = [50, 101, 205, 36];
export const RIGHT_CHEEK = [280, 330, 425, 266];
// Cheek, forehead and chin points that sit on open skin away from the nose,
// lips, brows and jaw shadow.
const SKIN_LANDMARKS = [...LEFT_CHEEK, ...RIGHT_CHEEK, 151, 108, 337, 199];
export const FACE_LEFT = 234;
export const FACE_RIGHT = 454;

// Each iris is a centre point plus four points on its limbus, paired with the
// eyelid contour of the same eye so lids and lashes can be excluded.
const EYES = [
  {
    centre: 468,
    ring: [469, 470, 471, 472],
    lids: [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246],
  },
  {
    centre: 473,
    ring: [474, 475, 476, 477],
    lids: [263, 249, 390, 373, 374, 380, 381, 382, 362, 398, 384, 385, 386, 387, 388, 466],
  },
];

export const FACE_OVAL = [
  10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378,
  400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21,
  54, 103, 67, 109,
];

// Disc radius per skin point, as a fraction of face width.
const SKIN_RADIUS = 0.04;
// Sample the iris between the pupil and the dark limbal ring.
const IRIS_INNER = 0.35;
const IRIS_OUTER = 0.85;
const HAIR_THRESHOLD = 0.8;
// The segmenter bleeds onto forehead skin at the hairline, so the face oval is
// grown about its centre before excluding it.
const FACE_OVAL_GROWTH = 1.15;
const MAX_HAIR_SAMPLES = 4000;

/** Face width in pixels (cheekbone to cheekbone). */
export function faceWidthPx(source: PixelSource, landmarks: Point[]): number {
  const left = landmarks[FACE_LEFT];
  const right = landmarks[FACE_RIGHT];
  if (!left || !right) return 0;
  return Math.hypot(
    (right.x - left.x) * source.width,
    (right.y - left.y) * source.height,
  );
}

/**
 * Skin pixels from discs around stable cheek/forehead/chin points, or only
 * around `indices` when given (e.g. one cheek).
 */
export function sampleSkin(
  source: PixelSource,
  landmarks: Point[],
  hairMask?: HairMask,
  indices: number[] = SKIN_LANDMARKS,
): Lab[] {
  const radius = Math.max(2, Math.round(SKIN_RADIUS * faceWidthPx(source, landmarks)));
  const samples: Lab[] = [];
  for (const idx of indices) {
    const p = landmarks[idx];
    if (!p) continue;
    const cx = Math.round(p.x * source.width);
    const cy = Math.round(p.y * source.height);
    forEachInDisc(source, cx, cy, radius, (x, y) => {
      // Fringes and stray strands over the forehead are not skin.
      if (hairMask && hairMask(x, y) > 0.5) return;
      samples.push(rgbToLab(source.getPixel(x, y)));
    });
  }
  return samples;
}

/** Iris pixels from an annulus around each iris centre, inside the eyelids. */
export function sampleEye(source: PixelSource, landmarks: Point[]): Lab[] {
  const samples: Lab[] = [];
  for (const eye of EYES) {
    const centre = landmarks[eye.centre];
    if (!centre) continue;
    const cx = centre.x * source.width;
    const cy = centre.y * source.height;
    const ring = eye.ring.map((i) => landmarks[i]).filter(Boolean);
    if (ring.length === 0) continue;
    const radius =
      ring.reduce(
        (sum, p) => sum + Math.hypot(p.x * source.width - cx, p.y * source.height - cy),
        0,
      ) / ring.length;
    const lids = eye.lids.map((i) => toPx(source, landmarks[i]));

    forEachInDisc(source, Math.round(cx), Math.round(cy), Math.ceil(radius * IRIS_OUTER), (x, y) => {
      const d = Math.hypot(x - cx, y - cy);
      if (d < radius * IRIS_INNER || d > radius * IRIS_OUTER) return;
      if (!insidePolygon(x, y, lids)) return;
      samples.push(rgbToLab(source.getPixel(x, y)));
    });
  }
  return samples;
}

/**
 * Eye-white pixels: inside the eyelids but outside the iris. The sclera is
 * close to neutral, so it tells us the exposure and colour cast of the light.
 */
export function sampleSclera(source: PixelSource, landmarks: Point[]): Lab[] {
  const samples: Lab[] = [];
  for (const eye of EYES) {
    const centre = landmarks[eye.centre];
    if (!centre) continue;
    const cx = centre.x * source.width;
    const cy = centre.y * source.height;
    const ring = eye.ring.map((i) => landmarks[i]).filter(Boolean);
    if (ring.length === 0) continue;
    const radius =
      ring.reduce(
        (sum, p) => sum + Math.hypot(p.x * source.width - cx, p.y * source.height - cy),
        0,
      ) / ring.length;
    const lids = eye.lids.map((i) => toPx(source, landmarks[i]));
    const xs = lids.map((p) => p.x);
    const ys = lids.map((p) => p.y);
    for (let y = Math.floor(Math.min(...ys)); y <= Math.ceil(Math.max(...ys)); y++) {
      for (let x = Math.floor(Math.min(...xs)); x <= Math.ceil(Math.max(...xs)); x++) {
        if (x < 0 || y < 0 || x >= source.width || y >= source.height) continue;
        if (Math.hypot(x - cx, y - cy) < radius * 1.15) continue;
        if (!insidePolygon(x, y, lids)) continue;
        samples.push(rgbToLab(source.getPixel(x, y)));
      }
    }
  }
  return samples;
}

/**
 * Hair pixels from the segmentation mask, outside the face oval. Returns an
 * empty array without a mask; hair is then left to the manual screen.
 */
export function sampleHair(
  source: PixelSource,
  landmarks: Point[],
  hairMask?: HairMask,
): Lab[] {
  if (!hairMask) return [];
  const oval = grow(FACE_OVAL.map((i) => toPx(source, landmarks[i])), FACE_OVAL_GROWTH);
  const stride = Math.max(
    1,
    Math.floor(Math.sqrt((source.width * source.height) / (MAX_HAIR_SAMPLES * 4))),
  );
  const samples: Lab[] = [];
  for (let y = 0; y < source.height; y += stride) {
    for (let x = 0; x < source.width; x += stride) {
      if (hairMask(x, y) < HAIR_THRESHOLD) continue;
      if (insidePolygon(x, y, oval)) continue;
      samples.push(rgbToLab(source.getPixel(x, y)));
    }
  }
  return samples;
}

/** Face bounding-box area as a fraction of the image, from the landmark spread. */
export function faceAreaFraction(landmarks: Point[]): number {
  if (landmarks.length === 0) return 0;
  let minX = 1;
  let minY = 1;
  let maxX = 0;
  let maxY = 0;
  for (const p of landmarks) {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  }
  return Math.max(0, (maxX - minX) * (maxY - minY));
}

function grow(polygon: Point[], factor: number): Point[] {
  const cx = polygon.reduce((sum, p) => sum + p.x, 0) / polygon.length;
  const cy = polygon.reduce((sum, p) => sum + p.y, 0) / polygon.length;
  return polygon.map((p) => ({ x: cx + (p.x - cx) * factor, y: cy + (p.y - cy) * factor }));
}

function toPx(source: PixelSource, p: Point | undefined): Point {
  return p ? { x: p.x * source.width, y: p.y * source.height } : { x: NaN, y: NaN };
}

function forEachInDisc(
  source: PixelSource,
  cx: number,
  cy: number,
  radius: number,
  visit: (x: number, y: number) => void,
): void {
  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      if (dx * dx + dy * dy > radius * radius) continue;
      const x = cx + dx;
      const y = cy + dy;
      if (x < 0 || y < 0 || x >= source.width || y >= source.height) continue;
      visit(x, y);
    }
  }
}

/** Even-odd point-in-polygon test. */
function insidePolygon(x: number, y: number, polygon: Point[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const a = polygon[i];
    const b = polygon[j];
    if (a.y > y !== b.y > y && x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x) {
      inside = !inside;
    }
  }
  return inside;
}
