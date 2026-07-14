import { rgbToLab, type Lab, type Rgb } from "./colour.ts";

/**
 * Region sampling. Given a face's landmarks and a pixel source, collect the
 * pixels that belong to the skin / iris / hair regions so they can be clustered
 * into a dominant colour.
 *
 * The pixel source is abstracted so the same code runs over a browser canvas
 * `ImageData` (client) and a posted RGBA buffer (server fallback). Coordinates
 * follow MediaPipe's convention: normalised [0,1] landmark points.
 */

export type Point = { x: number; y: number };

export type PixelSource = {
  width: number;
  height: number;
  /** RGB at integer pixel (x,y); callers guarantee in-bounds. */
  getPixel: (x: number, y: number) => Rgb;
};

/**
 * MediaPipe FaceLandmarker indices (478-point mesh, refineLandmarks=true).
 * Cheek points avoid the nose, lips and shadowed jaw; iris ring points come
 * from the refined iris landmarks (the centres 468/473 sit on the dark pupil,
 * so we use the surrounding ring).
 */
export const CHEEK_LANDMARKS = [50, 101, 205, 280, 330, 425] as const;
export const IRIS_RING_LANDMARKS = [
  469, 470, 471, 472, 474, 475, 476, 477,
] as const;
export const FACE_TOP_LANDMARK = 10; // mid-forehead hairline-ish top
export const CHIN_LANDMARK = 152;

const SKIN_RADIUS_PX = 4;
const IRIS_RADIUS_PX = 1;

/** Collect Lab samples for the skin region (cheek discs). */
export function sampleSkin(source: PixelSource, landmarks: Point[]): Lab[] {
  return sampleAtLandmarks(source, landmarks, CHEEK_LANDMARKS, SKIN_RADIUS_PX);
}

/** Collect Lab samples for the eye region (iris ring discs). */
export function sampleEye(source: PixelSource, landmarks: Point[]): Lab[] {
  return sampleAtLandmarks(
    source,
    landmarks,
    IRIS_RING_LANDMARKS,
    IRIS_RADIUS_PX,
  );
}

/**
 * Collect Lab samples for hair: a band above the forehead top landmark. Returns
 * an empty array when that band falls outside the image (e.g. very short hair
 * or a tight crop), which the caller treats as "no hair detected".
 */
export function sampleHair(source: PixelSource, landmarks: Point[]): Lab[] {
  const top = landmarks[FACE_TOP_LANDMARK];
  const chin = landmarks[CHIN_LANDMARK];
  if (!top || !chin) return [];

  const faceHeight = Math.abs(chin.y - top.y);
  const bandCenterY = top.y - faceHeight * 0.45;
  const halfWidth = faceHeight * 0.18;

  const samples: Lab[] = [];
  const steps = 5;
  for (let i = 0; i <= steps; i++) {
    const nx = top.x - halfWidth + (2 * halfWidth * i) / steps;
    const px = Math.round(nx * source.width);
    const py = Math.round(bandCenterY * source.height);
    if (px < 0 || py < 0 || px >= source.width || py >= source.height) continue;
    samples.push(rgbToLab(source.getPixel(px, py)));
  }
  return samples;
}

export type NormalisedBox = { x0: number; y0: number; x1: number; y1: number };

/**
 * Sample a grid of pixels inside a normalised box. Used by the landmark-free
 * server fallback: a centre box approximates the face/skin and a top band
 * approximates hair when no landmark mesh is available.
 */
export function sampleBox(
  source: PixelSource,
  box: NormalisedBox,
  steps = 12,
): Lab[] {
  const samples: Lab[] = [];
  for (let iy = 0; iy <= steps; iy++) {
    for (let ix = 0; ix <= steps; ix++) {
      const nx = box.x0 + ((box.x1 - box.x0) * ix) / steps;
      const ny = box.y0 + ((box.y1 - box.y0) * iy) / steps;
      const px = Math.round(nx * source.width);
      const py = Math.round(ny * source.height);
      if (px < 0 || py < 0 || px >= source.width || py >= source.height)
        continue;
      samples.push(rgbToLab(source.getPixel(px, py)));
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

/** Mean L* over a set of Lab samples. */
export function meanLightness(samples: Lab[]): number {
  if (samples.length === 0) return 0;
  return samples.reduce((sum, s) => sum + s.l, 0) / samples.length;
}

function sampleAtLandmarks(
  source: PixelSource,
  landmarks: Point[],
  indices: readonly number[],
  radiusPx: number,
): Lab[] {
  const samples: Lab[] = [];
  for (const idx of indices) {
    const point = landmarks[idx];
    if (!point) continue;
    const cx = Math.round(point.x * source.width);
    const cy = Math.round(point.y * source.height);
    samples.push(...sampleDisc(source, cx, cy, radiusPx));
  }
  return samples;
}

function sampleDisc(
  source: PixelSource,
  cx: number,
  cy: number,
  radiusPx: number,
): Lab[] {
  const samples: Lab[] = [];
  for (let dy = -radiusPx; dy <= radiusPx; dy++) {
    for (let dx = -radiusPx; dx <= radiusPx; dx++) {
      if (dx * dx + dy * dy > radiusPx * radiusPx) continue;
      const x = cx + dx;
      const y = cy + dy;
      if (x < 0 || y < 0 || x >= source.width || y >= source.height) continue;
      samples.push(rgbToLab(source.getPixel(x, y)));
    }
  }
  return samples;
}
