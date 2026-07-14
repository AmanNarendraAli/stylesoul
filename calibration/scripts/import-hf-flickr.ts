/**
 * Import a small, local calibration subset from:
 *   ljnlonoljpiljm/flickr-faces-attributes-2048
 *
 * This uses Hugging Face's dataset viewer API instead of downloading the full
 * parquet archive. Output files are intentionally gitignored because they are
 * face photos plus proxy labels.
 *
 * Run:
 *   npm run calibrate:import:hf-flickr
 *
 * Optional:
 *   npm run calibrate:import:hf-flickr -- --target-per-skin=50 --force
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type {
  EyeColour,
  HairColour,
  SkinTone,
  Undertone,
} from "../../lib/colour-season/map.ts";
import { skinOptions } from "../../lib/colour-season/options.ts";

const DATASET = "ljnlonoljpiljm/flickr-faces-attributes-2048";
const CONFIG = "default";
const SPLIT = "train";
const PAGE_LENGTH = 100;
const DEFAULT_MAX_ROWS = 2048;
const DEFAULT_TARGET_PER_SKIN = 50;

const here = dirname(fileURLToPath(import.meta.url));
const calibrationDir = join(here, "..");
const samplesDir = join(calibrationDir, "samples");
const labelsPath = join(calibrationDir, "labels.csv");
const summaryPath = join(calibrationDir, "hf-flickr-summary.json");

type ImageCell = {
  src: string;
  width?: number;
  height?: number;
};

type HfRow = {
  row_idx: number;
  row: {
    image?: ImageCell;
    id?: number;
    skintone?: string;
    hair_color?: string;
    eye_color?: string;
    gender?: string;
    age_range?: string;
    gaze?: string;
    lighting?: string;
    angle?: string;
    text?: string;
  };
};

type RowsResponse = {
  rows: HfRow[];
  num_rows_total?: number;
};

type SelectedSample = {
  filename: string;
  rowIdx: number;
  sourceId?: number;
  labels: {
    skinTone: SkinTone;
    undertone: Undertone;
    eyeColour: EyeColour;
    hairColour: HairColour;
  };
  raw: {
    skintone?: string;
    eye_color?: string;
    hair_color?: string;
    gender?: string;
    age_range?: string;
    gaze?: string;
    lighting?: string;
    angle?: string;
  };
};

const force = process.argv.includes("--force");
const targetPerSkin = readNumberArg("target-per-skin", DEFAULT_TARGET_PER_SKIN);
const maxRows = readNumberArg("max-rows", DEFAULT_MAX_ROWS);

if (!force && existsSync(labelsPath)) {
  throw new Error(
    "calibration/labels.csv already exists. Re-run with -- --force if you want to overwrite it.",
  );
}

mkdirSync(samplesDir, { recursive: true });

const skinTargets = new Set<SkinTone>(skinOptions.map((option) => option.value));
const skinCounts = new Map<SkinTone, number>();
for (const skinTone of skinTargets) skinCounts.set(skinTone, 0);

const selected: SelectedSample[] = [];
const rejected = new Map<string, number>();
let scanned = 0;

for (let offset = 0; offset < maxRows; offset += PAGE_LENGTH) {
  const page = await fetchRows(offset, Math.min(PAGE_LENGTH, maxRows - offset));
  if (page.rows.length === 0) break;

  for (const item of page.rows) {
    scanned += 1;
    const mapped = mapRow(item);
    if (!mapped.ok) {
      bump(rejected, mapped.reason);
      continue;
    }

    const currentSkinCount = skinCounts.get(mapped.sample.labels.skinTone) ?? 0;
    if (currentSkinCount >= targetPerSkin) {
      bump(rejected, "skin_bucket_full");
      continue;
    }

    await downloadImage(mapped.image.src, join(samplesDir, mapped.sample.filename));
    selected.push(mapped.sample);
    skinCounts.set(mapped.sample.labels.skinTone, currentSkinCount + 1);
  }

  if ([...skinTargets].every((skinTone) => (skinCounts.get(skinTone) ?? 0) >= targetPerSkin)) {
    break;
  }
}

writeFileSync(labelsPath, toCsv(selected), "utf8");
writeFileSync(
  summaryPath,
  JSON.stringify(
    {
      dataset: DATASET,
      config: CONFIG,
      split: SPLIT,
      scanned,
      selected: selected.length,
      targetPerSkin,
      maxRows,
      skinCounts: Object.fromEntries(skinCounts),
      rejected: Object.fromEntries([...rejected.entries()].sort((a, b) => b[1] - a[1])),
      caveat:
        "Dataset labels are proxy/caption-derived, not self-identified StyleSoul labels. Use as bootstrap calibration data only.",
      samples: selected,
    },
    null,
    2,
  ),
  "utf8",
);

console.log(`Scanned ${scanned} rows from ${DATASET}.`);
console.log(`Selected ${selected.length} labelled samples.`);
console.log(`Wrote ${labelsPath}`);
console.log(`Wrote ${summaryPath}`);
console.log("Skin counts:");
for (const [skinTone, count] of skinCounts) {
  console.log(`  ${skinTone}: ${count}`);
}
if (selected.length === 0) {
  process.exitCode = 1;
}

async function fetchRows(offset: number, length: number): Promise<RowsResponse> {
  const url = new URL("https://datasets-server.huggingface.co/rows");
  url.searchParams.set("dataset", DATASET);
  url.searchParams.set("config", CONFIG);
  url.searchParams.set("split", SPLIT);
  url.searchParams.set("offset", String(offset));
  url.searchParams.set("length", String(length));

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Hugging Face rows request failed: ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as RowsResponse;
}

async function downloadImage(src: string, path: string) {
  if (!force && existsSync(path)) return;
  const response = await fetch(src);
  if (!response.ok) {
    throw new Error(`Image download failed: ${response.status} ${response.statusText}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  writeFileSync(path, buffer);
}

function mapRow(item: HfRow):
  | { ok: true; sample: SelectedSample; image: ImageCell }
  | { ok: false; reason: string } {
  const row = item.row;
  if (!row.image?.src) return { ok: false, reason: "missing_image" };
  if (isLikelyMinor(row)) return { ok: false, reason: "minor_or_unclear_age" };
  if (isObstructed(row)) return { ok: false, reason: "obstructed_face_or_eyes" };

  const skin = mapSkin(row.skintone);
  if (!skin) return { ok: false, reason: "unmapped_skin" };
  const eyeColour = mapEyeColour(row.eye_color);
  if (!eyeColour) return { ok: false, reason: "unmapped_eye" };
  const hairColour = mapHairColour(row.hair_color);
  if (!hairColour) return { ok: false, reason: "unmapped_hair" };

  return {
    ok: true,
    image: row.image,
    sample: {
      filename: `hf-${String(item.row_idx).padStart(4, "0")}.jpg`,
      rowIdx: item.row_idx,
      sourceId: row.id,
      labels: { ...skin, eyeColour, hairColour },
      raw: {
        skintone: row.skintone,
        eye_color: row.eye_color,
        hair_color: row.hair_color,
        gender: row.gender,
        age_range: row.age_range,
        gaze: row.gaze,
        lighting: row.lighting,
        angle: row.angle,
      },
    },
  };
}

function mapSkin(
  value: string | undefined,
): { skinTone: SkinTone; undertone: Undertone } | null {
  const text = normalize(value);
  if (!text) return null;

  const cool = hasAny(text, ["cool", "pink", "rosy", "rose", "blue undertone"]);
  const warm = hasAny(text, ["warm", "golden", "peach", "yellow", "red undertone", "orange"]);
  const undertone: Undertone = hasAny(text, ["olive"])
    ? "olive"
    : warm
      ? "warm"
      : cool
        ? "cool"
        : "neutral";

  if (hasAny(text, ["very deep", "ebony", "mahogany", "black"])) return { skinTone: "very_deep", undertone };
  if (hasAny(text, ["deep", "dark", "rich"])) return { skinTone: "deep", undertone };
  if (hasAny(text, ["brown"])) return { skinTone: "brown", undertone };
  if (hasAny(text, ["tan", "tanned", "caramel", "honey"])) return { skinTone: "tan", undertone };
  if (hasAny(text, ["medium", "olive"])) return { skinTone: "medium", undertone };
  if (hasAny(text, ["light"])) return { skinTone: "light", undertone };
  if (hasAny(text, ["fair", "pale", "white"])) return { skinTone: "fair", undertone };
  if (hasAny(text, ["porcelain"])) return { skinTone: "porcelain", undertone };
  return null;
}

function mapEyeColour(value: string | undefined): EyeColour | null {
  const text = normalize(value);
  if (!text) return null;
  if (hasAny(text, ["hazel"])) return "hazel";
  if (hasAny(text, ["amber", "gold"])) return "amber";
  if (hasAny(text, ["blue"])) return "blue";
  if (hasAny(text, ["green"])) return "green";
  if (hasAny(text, ["grey", "gray"])) return "grey";
  if (hasAny(text, ["brown", "dark", "black"])) return "brown";
  return null;
}

function mapHairColour(value: string | undefined): HairColour | null {
  const text = normalize(value);
  if (!text) return null;
  if (hasAny(text, ["bald", "shaved", "not visible", "covered"])) return null;
  if (hasAny(text, ["grey", "gray", "silver"])) return "grey";
  if (hasAny(text, ["platinum"])) return "platinum_blonde";
  if (hasAny(text, ["auburn"])) return "auburn";
  if (hasAny(text, ["red", "ginger", "copper"])) return "red";
  if (hasAny(text, ["black"])) return "black";
  if (hasAny(text, ["blonde", "blond", "golden"])) return "golden_blonde";
  if (hasAny(text, ["ash brown", "light brown", "mousy", "mousey"])) return "ash_brown";
  if (hasAny(text, ["brown", "brunette", "chestnut"])) return "chestnut_brown";
  return null;
}

function isLikelyMinor(row: HfRow["row"]): boolean {
  const text = normalize([row.gender, row.age_range, row.text].filter(Boolean).join(" "));
  if (hasAny(text, ["baby", "toddler", "infant", "child", "kid", "teenager", "teen", "boy", "girl"])) {
    return true;
  }
  const ages = [...text.matchAll(/\b(\d{1,2})\b/g)].map((match) => Number(match[1]));
  return ages.length > 0 && Math.min(...ages) < 18;
}

function isObstructed(row: HfRow["row"]): boolean {
  const text = normalize([row.text, row.gaze, row.angle, row.hair_color, row.eye_color].filter(Boolean).join(" "));
  return hasAny(text, [
    "eyes closed",
    "sunglasses",
    "glasses obscure",
    "mask",
    "helmet covers",
    "face covered",
    "back of",
    "profile view",
  ]);
}

function toCsv(samples: SelectedSample[]): string {
  const rows = ["filename,skinTone,undertone,eyeColour,hairColour"];
  for (const sample of samples) {
    const { skinTone, undertone, eyeColour, hairColour } = sample.labels;
    rows.push([sample.filename, skinTone, undertone, eyeColour, hairColour].join(","));
  }
  return `${rows.join("\n")}\n`;
}

function readNumberArg(name: string, fallback: number): number {
  const arg = process.argv.find((item) => item.startsWith(`--${name}=`));
  if (!arg) return fallback;
  const value = Number(arg.slice(name.length + 3));
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`Invalid --${name}: ${arg}`);
  }
  return value;
}

function bump(map: Map<string, number>, key: string) {
  map.set(key, (map.get(key) ?? 0) + 1);
}

function normalize(value: string | undefined): string {
  return (value ?? "")
    .toLowerCase()
    .replace(/[._-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasAny(text: string, needles: string[]): boolean {
  return needles.some((needle) => text.includes(needle));
}
