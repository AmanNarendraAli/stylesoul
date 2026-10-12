import { FACE_OVAL, type HairMask, type PixelSource, type Point } from "./regions.ts";

/**
 * Image crops fed to the MediaPipe image embedder. Training
 * (calibration/scripts/features.ts) and the browser both build them here, so
 * the embedder sees identical pixels in both.
 */
export type RgbaImage = { width: number; height: number; data: Uint8ClampedArray<ArrayBuffer> };

const HAIR_THRESHOLD = 0.8;
const BACKGROUND = 128;

/** Square box around the face oval, clamped to the image. */
export function faceCrop(source: PixelSource, landmarks: Point[]): RgbaImage | undefined {
  const points = FACE_OVAL.map((i) => landmarks[i]).filter(Boolean);
  if (points.length === 0) return undefined;
  const xs = points.map((p) => p.x * source.width);
  const ys = points.map((p) => p.y * source.height);
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
  const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  const half = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)) / 2;
  const x0 = Math.max(0, Math.round(cx - half));
  const y0 = Math.max(0, Math.round(cy - half));
  const x1 = Math.min(source.width, Math.round(cx + half));
  const y1 = Math.min(source.height, Math.round(cy + half));
  if (x1 - x0 < 8 || y1 - y0 < 8) return undefined;
  return copy(source, x0, y0, x1 - x0, y1 - y0, () => true);
}

/** The whole image with everything but confident hair painted grey. */
export function hairOnly(source: PixelSource, hairMask: HairMask): RgbaImage {
  return copy(source, 0, 0, source.width, source.height, (x, y) => hairMask(x, y) >= HAIR_THRESHOLD);
}

function copy(
  source: PixelSource,
  x0: number,
  y0: number,
  width: number,
  height: number,
  keep: (x: number, y: number) => boolean,
): RgbaImage {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const inside = keep(x0 + x, y0 + y);
      const { r, g, b } = inside ? source.getPixel(x0 + x, y0 + y) : { r: BACKGROUND, g: BACKGROUND, b: BACKGROUND };
      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
      data[i + 3] = 255;
    }
  }
  return { width, height, data };
}
