/**
 * Batch-generate calibration predictions from local images.
 *
 * This intentionally uses the app's existing landmark-free fallback detector
 * (`detectColouringHeuristic`) so it can run in Node with only an image decoder.
 * It is a bootstrap signal for matcher/skin+hair confusion, not a replacement
 * for labelled, consented validation through the full MediaPipe client path.
 *
 * Run:
 *   npm run calibrate:predict
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import {
  detectColouringHeuristic,
  type DetectedColouring,
} from "../../lib/colour-detection/detect.ts";
import type { PixelSource } from "../../lib/colour-detection/regions.ts";

const MAX_EDGE = 512;

const here = dirname(fileURLToPath(import.meta.url));
const calibrationDir = join(here, "..");
const samplesDir = join(calibrationDir, "samples");
const labelsPath = join(calibrationDir, "labels.csv");
const predictionsPath = join(calibrationDir, "predictions.json");
const detailsPath = join(calibrationDir, "prediction-details.json");

if (!existsSync(labelsPath)) {
  throw new Error("Missing calibration/labels.csv. Run calibrate:import:hf-flickr first.");
}

const filenames = parseLabelFilenames(labelsPath);
type PredictionChannel = "skinTone" | "undertone" | "eyeColour" | "hairColour";

const predictions: Record<string, Partial<Record<PredictionChannel, string>>> = {};
const details: Record<string, DetectedColouring> = {};
let predicted = 0;

for (const filename of filenames) {
  const imagePath = join(samplesDir, filename);
  if (!existsSync(imagePath)) {
    console.warn(`Skipping ${filename}: missing sample image`);
    continue;
  }
  const source = await readPixelSource(imagePath);
  const detected = detectColouringHeuristic(source);
  details[filename] = detected;
  predictions[filename] = {
    skinTone: detected.skinTone?.value,
    undertone: detected.undertone?.value,
    eyeColour: detected.eyeColour?.value,
    hairColour: detected.hairColour?.value,
  };
  predicted += 1;
}

writeFileSync(predictionsPath, `${JSON.stringify(predictions, null, 2)}\n`, "utf8");
writeFileSync(detailsPath, `${JSON.stringify(details, null, 2)}\n`, "utf8");

console.log(`Predicted ${predicted}/${filenames.length} samples.`);
console.log(`Wrote ${predictionsPath}`);
console.log(`Wrote ${detailsPath}`);
console.log("Note: heuristic fallback predicts skin/hair only; eyeColour remains manual without landmarks.");

async function readPixelSource(path: string): Promise<PixelSource> {
  const { data, info } = await sharp(path)
    .rotate()
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  return {
    width: info.width,
    height: info.height,
    getPixel: (x, y) => {
      const offset = (y * info.width + x) * 4;
      return {
        r: data[offset],
        g: data[offset + 1],
        b: data[offset + 2],
      };
    },
  };
}

function parseLabelFilenames(path: string): string[] {
  const lines = readFileSync(path, "utf8").trim().split(/\r?\n/);
  const header = lines[0].split(",").map((cell) => cell.trim());
  const filenameIndex = header.indexOf("filename");
  if (filenameIndex === -1) {
    throw new Error("labels.csv must include a filename column.");
  }
  return lines
    .slice(1)
    .map((line) => line.split(",")[filenameIndex]?.trim())
    .filter(Boolean);
}
