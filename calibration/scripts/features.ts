/**
 * Compute classifier features for every extracted sample (see extract.py) with
 * the app's own `extractFeatures`, and write them as JSON for train.py. Also
 * writes the embedder crops (<id>.face.png, <id>.haironly.png) for embed.py.
 *
 * Run:
 *   node --experimental-strip-types calibration/scripts/features.ts <extract-dir> <out.json>
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { faceCrop, hairOnly, type RgbaImage } from "../../lib/colour-detection/crops.ts";
import { extractFeatures } from "../../lib/colour-detection/features.ts";
import { faceAreaFraction, pixelSourceFromRgba } from "../../lib/colour-detection/regions.ts";

const [dir, outPath] = process.argv.slice(2);
if (!dir || !outPath) throw new Error("usage: features.ts <extract-dir> <out.json>");

const rows: Record<string, unknown> = {};
for (const file of readdirSync(dir).filter((f) => f.endsWith(".json"))) {
  const id = file.slice(0, -".json".length);
  const { faceCount, landmarks } = JSON.parse(readFileSync(join(dir, file), "utf8")) as {
    faceCount: number;
    landmarks: [number, number][];
  };
  if (faceCount !== 1) continue;
  const points = landmarks.map(([x, y]) => ({ x, y }));

  const image = await sharp(join(dir, `${id}.png`)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const mask = await sharp(join(dir, `${id}.hair.png`)).greyscale().raw().toBuffer({ resolveWithObject: true });
  const source = pixelSourceFromRgba(image.data, image.info.width, image.info.height);
  const hairMask = (x: number, y: number) => mask.data[y * mask.info.width + x] / 255;

  rows[id] = { faceArea: faceAreaFraction(points), ...extractFeatures(source, points, hairMask) };
  const face = faceCrop(source, points);
  if (face) await savePng(face, join(dir, `${id}.face.png`));
  await savePng(hairOnly(source, hairMask), join(dir, `${id}.haironly.png`));
}

async function savePng(image: RgbaImage, path: string) {
  await sharp(Buffer.from(image.data.buffer), { raw: { width: image.width, height: image.height, channels: 4 } })
    .png()
    .toFile(path);
}

writeFileSync(outPath, JSON.stringify(rows));
console.log(`wrote ${Object.keys(rows).length} rows -> ${outPath}`);
