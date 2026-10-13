/**
 * Calibrates lib/face-shape/measure.ts: for frontal, mouth-closed faces
 * (measureFace's own gate), prints each raw measure's percentiles and its
 * same-person repeatability (one-way intraclass correlation over people with
 * two or more photos; the photo-library ids are <person8>_<photo8>).
 *
 * Run after face_landmarks.py:
 *   node --experimental-strip-types calibration/scripts/face_shape.ts calibration/out/photos
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { measureFace, rawMeasures } from "../../lib/face-shape/measure.ts";

const [dir] = process.argv.slice(2);
if (!dir) throw new Error("usage: face_shape.ts <extract-dir>");

const rows: { person: string; length: number; lines: number }[] = [];
for (const file of readdirSync(dir).filter((f) => f.endsWith(".face3d.json"))) {
  const id = file.slice(0, -".face3d.json".length);
  const { faceCount, landmarks } = JSON.parse(readFileSync(join(dir, file), "utf8")) as {
    faceCount: number;
    landmarks: [number, number, number][];
  };
  if (faceCount !== 1) continue;
  const { width = 0, height = 0 } = await sharp(join(dir, `${id}.png`)).metadata();
  const points = landmarks.map(([x, y, z]) => ({ x, y, z }));
  if (!measureFace(points, width, height)) continue;
  const raw = rawMeasures(landmarks.map(([x, y, z]) => [x * width, y * height, z * width]));
  rows.push({ person: id.split("_")[0], ...raw });
}

console.log(`${rows.length} frontal, mouth-closed faces`);
for (const key of ["length", "lines"] as const) {
  const values = rows.map((row) => row[key]).sort((a, b) => a - b);
  const pct = (q: number) => values[Math.round(q * (values.length - 1))].toFixed(3);
  const groups = new Map<string, number[]>();
  for (const row of rows) groups.set(row.person, [...(groups.get(row.person) ?? []), row[key]]);
  console.log(
    `${key}: p5 ${pct(0.05)} p33 ${pct(1 / 3)} p67 ${pct(2 / 3)} p95 ${pct(0.95)}; ICC ${icc([...groups.values()]).toFixed(2)}`,
  );
}

function icc(all: number[][]) {
  const groups = all.filter((g) => g.length >= 2);
  const n = groups.reduce((sum, g) => sum + g.length, 0);
  const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
  const grand = mean(groups.flat());
  const ssb = groups.reduce((sum, g) => sum + g.length * (mean(g) - grand) ** 2, 0);
  const ssw = groups.reduce((sum, g) => sum + g.reduce((s, x) => s + (x - mean(g)) ** 2, 0), 0);
  const msb = ssb / (groups.length - 1);
  const msw = ssw / (n - groups.length);
  const n0 = (n - groups.reduce((sum, g) => sum + g.length ** 2, 0) / n) / (groups.length - 1);
  return (msb - msw) / (msb + (n0 - 1) * msw);
}
