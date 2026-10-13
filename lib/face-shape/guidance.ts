import type { Drape, Neckline, Pattern } from "../catalogue/schema.ts";
import {
  faceLength,
  faceLines,
  type FaceLength,
  type FaceLines,
  type FaceShape,
} from "./measure.ts";

/**
 * Stylists' rules of thumb for the face: necklines either lengthen (V, scoop)
 * or widen (boat, square, high) the face, and a face's lines are echoed in
 * the necklines, prints and fabrics that suit it (curved: round necks,
 * florals, fluid fabrics; straight: V and square necks, geometric prints,
 * crisp fabrics).
 */

type NecklineRule = { wear: readonly Neckline[]; skip: readonly Neckline[] };

const LENGTH_NECKLINES: Record<FaceLength, NecklineRule> = {
  compact: { wear: ["v", "scoop", "sweetheart"], skip: ["high", "boat", "mandarin"] },
  balanced: { wear: [], skip: [] },
  long: { wear: ["boat", "square", "round", "mandarin", "high", "cowl"], skip: ["v"] },
};

const LINES: Record<
  FaceLines,
  NecklineRule & { pattern: Pattern | null; drape: Drape | null }
> = {
  curved: {
    wear: ["round", "scoop", "sweetheart", "cowl"],
    skip: ["square", "collar"],
    pattern: "floral",
    drape: "fluid",
  },
  balanced: { wear: [], skip: [], pattern: null, drape: null },
  straight: {
    wear: ["v", "square", "collar", "mandarin"],
    skip: ["sweetheart", "cowl"],
    pattern: "geometric",
    drape: "crisp",
  },
};

const OPPOSITE_PATTERN: Partial<Record<Pattern, Pattern>> = {
  floral: "geometric",
  geometric: "floral",
};
const OPPOSITE_DRAPE: Record<Drape, Drape> = { crisp: "fluid", fluid: "crisp" };

/** +2 to −2: how well a neckline suits the face. */
export function necklineFit(neckline: Neckline, face: FaceShape) {
  const rules = [LENGTH_NECKLINES[faceLength(face)], LINES[faceLines(face)]];
  return rules.reduce(
    (score, rule) =>
      score + (rule.wear.includes(neckline) ? 1 : 0) - (rule.skip.includes(neckline) ? 1 : 0),
    0,
  );
}

export type GarmentDetails = {
  neckline?: string | null;
  pattern?: string | null;
  drape?: string | null;
};

/** What about a garment suits the face (positive) or works against it (negative). */
export function faceFit(garment: GarmentDetails, face: FaceShape) {
  const lines = LINES[faceLines(face)];
  let score = garment.neckline ? necklineFit(garment.neckline as Neckline, face) : 0;
  if (lines.pattern && garment.pattern === lines.pattern) score += 1;
  if (lines.pattern && garment.pattern === OPPOSITE_PATTERN[lines.pattern]) score -= 1;
  if (lines.drape && garment.drape === lines.drape) score += 1;
  if (lines.drape && garment.drape === OPPOSITE_DRAPE[lines.drape]) score -= 1;
  return score;
}

export type FaceGuidance = {
  length: FaceLength;
  lines: FaceLines;
  necklinesToWear: Neckline[];
  necklinesToSkip: Neckline[];
  pattern: Pattern | null;
  drape: Drape | null;
};

const ALL_NECKLINES: readonly Neckline[] = [
  "v",
  "scoop",
  "sweetheart",
  "round",
  "cowl",
  "square",
  "boat",
  "collar",
  "mandarin",
  "high",
];

export function faceGuidance(face: FaceShape): FaceGuidance {
  const lines = LINES[faceLines(face)];
  return {
    length: faceLength(face),
    lines: faceLines(face),
    necklinesToWear: ALL_NECKLINES.filter((neckline) => necklineFit(neckline, face) > 0),
    necklinesToSkip: ALL_NECKLINES.filter((neckline) => necklineFit(neckline, face) < 0),
    pattern: lines.pattern,
    drape: lines.drape,
  };
}
