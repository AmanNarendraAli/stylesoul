/**
 * Calibration report: compares detector predictions against ground-truth
 * labels and prints per-channel accuracy + confusion pairs. Dependency-free so
 * it runs with `node --experimental-strip-types`.
 *
 * Inputs (relative to the calibration/ folder):
 *   labels.csv         ground truth   (falls back to labels.example.csv)
 *   predictions.json   detector output (falls back to predictions.example.json)
 *
 * Run: npm run calibrate
 */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const dir = join(here, "..");

const CHANNELS = ["skinTone", "undertone", "eyeColour", "hairColour"] as const;
type Channel = (typeof CHANNELS)[number];
type Labels = Record<Channel, string>;

function pick(real: string, example: string): string {
  const realPath = join(dir, real);
  return existsSync(realPath) ? realPath : join(dir, example);
}

function parseCsv(path: string): Map<string, Labels> {
  const lines = readFileSync(path, "utf8").trim().split(/\r?\n/);
  const header = lines[0].split(",").map((h) => h.trim());
  const rows = new Map<string, Labels>();
  for (const line of lines.slice(1)) {
    if (!line.trim()) continue;
    const cells = line.split(",").map((c) => c.trim());
    const record = Object.fromEntries(header.map((h, i) => [h, cells[i]]));
    rows.set(record.filename, {
      skinTone: record.skinTone,
      undertone: record.undertone,
      eyeColour: record.eyeColour,
      hairColour: record.hairColour,
    });
  }
  return rows;
}

const labelsPath = pick("labels.csv", "labels.example.csv");
const predsPath = pick("predictions.json", "predictions.example.json");

const labels = parseCsv(labelsPath);
const predictions = JSON.parse(readFileSync(predsPath, "utf8")) as Record<
  string,
  Partial<Labels>
>;

console.log(`Labels:      ${labelsPath}`);
console.log(`Predictions: ${predsPath}`);
console.log(`Samples:     ${labels.size}\n`);

if (labelsPath.endsWith(".example.csv")) {
  console.log(
    "⚠️  Using example data — add calibration/labels.csv + predictions.json for real results.\n",
  );
}

let totalCorrect = 0;
let totalEvaluated = 0;

for (const channel of CHANNELS) {
  let correct = 0;
  let evaluated = 0;
  let missing = 0;
  const confusion = new Map<string, number>(); // "truth→pred" → count

  for (const [filename, truth] of labels) {
    const pred = predictions[filename]?.[channel];
    if (pred === undefined) {
      missing += 1;
      continue;
    }
    evaluated += 1;
    if (pred === truth[channel]) {
      correct += 1;
    } else {
      const key = `${truth[channel]} → ${pred}`;
      confusion.set(key, (confusion.get(key) ?? 0) + 1);
    }
  }

  totalCorrect += correct;
  totalEvaluated += evaluated;
  const pct = evaluated ? ((correct / evaluated) * 100).toFixed(1) : "n/a";
  console.log(
    `${channel.padEnd(11)} ${pct}%  (${correct}/${evaluated} correct, ${missing} not detected)`,
  );
  for (const [pair, count] of [...confusion.entries()].sort(
    (a, b) => b[1] - a[1],
  )) {
    console.log(`   ✗ ${pair}  ×${count}`);
  }
}

const overall = totalEvaluated
  ? ((totalCorrect / totalEvaluated) * 100).toFixed(1)
  : "n/a";
console.log(`\nOverall accuracy: ${overall}%  (${totalCorrect}/${totalEvaluated})`);
