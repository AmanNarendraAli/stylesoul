import { z } from "zod";
import { hexToLab } from "../colour-detection/colour.ts";
import { eyeOptions, hairOptions, skinOptions } from "./options.ts";

export const skinTones = [
  "porcelain",
  "fair",
  "light",
  "medium",
  "tan",
  "brown",
  "deep",
  "very_deep",
] as const;

export const eyeColours = [
  "blue",
  "green",
  "grey",
  "hazel",
  "brown",
  "amber",
] as const;

export const hairColours = [
  "platinum_blonde",
  "golden_blonde",
  "ash_brown",
  "chestnut_brown",
  "auburn",
  "red",
  "brown_black",
  "black",
  "grey",
] as const;

export const undertones = ["cool", "neutral", "warm", "olive"] as const;

export const colourSeasons = [
  "light_spring",
  "warm_spring",
  "bright_spring",
  "light_summer",
  "cool_summer",
  "soft_summer",
  "soft_autumn",
  "warm_autumn",
  "deep_autumn",
  "deep_winter",
  "cool_winter",
  "bright_winter",
] as const;

export const temperatures = ["warm", "neutral", "cool"] as const;
export const values = ["light", "medium", "deep"] as const;
export const chromas = ["bright", "medium", "soft"] as const;
export const contrasts = ["high", "medium", "low"] as const;

export type SkinTone = (typeof skinTones)[number];
export type EyeColour = (typeof eyeColours)[number];
export type HairColour = (typeof hairColours)[number];
export type Undertone = (typeof undertones)[number];
export type ColourSeason = (typeof colourSeasons)[number];
export type Temperature = (typeof temperatures)[number];
export type Value = (typeof values)[number];
export type Chroma = (typeof chromas)[number];
export type Contrast = (typeof contrasts)[number];

export function isColourSeason(value: string): value is ColourSeason {
  return (colourSeasons as readonly string[]).includes(value);
}

export const colouringSchema = z.object({
  skinTone: z.enum(skinTones, { error: "Pick a skin tone" }),
  undertone: z.enum(undertones, { error: "Pick an undertone" }),
  eyeColour: z.enum(eyeColours, { error: "Pick an eye colour" }),
  hairColour: z.enum(hairColours, { error: "Pick a hair colour" }),
});

export type Colouring = z.infer<typeof colouringSchema>;

export const seasonDimensionsSchema = z.object({
  temperature: z.enum(temperatures),
  value: z.enum(values),
  chroma: z.enum(chromas),
  contrast: z.enum(contrasts),
});

export type SeasonDimensions = z.infer<typeof seasonDimensionsSchema>;

// How "clear" (vs muted) each eye and hair colour reads, 0–1.
const eyeClarity: Record<EyeColour, number> = {
  blue: 1,
  green: 1,
  amber: 0.8,
  brown: 0.4,
  hazel: 0.2,
  grey: 0,
};
const hairClarity: Record<HairColour, number> = {
  red: 1,
  platinum_blonde: 0.7,
  golden_blonde: 0.6,
  auburn: 0.6,
  black: 0.5,
  brown_black: 0.45,
  chestnut_brown: 0.4,
  grey: 0.2,
  ash_brown: 0.1,
};
// Warm (+) or cool (−) lean of hair and eyes; undertone counts for ±2.
const hairWarmth: Record<HairColour, number> = {
  golden_blonde: 1,
  red: 1,
  auburn: 1,
  chestnut_brown: 1,
  brown_black: 0.5,
  black: 0,
  platinum_blonde: -0.5,
  ash_brown: -0.5,
  grey: -0.5,
};
const eyeWarmth: Record<EyeColour, number> = {
  amber: 0.5,
  hazel: 0.5,
  green: 0,
  brown: 0,
  blue: -0.5,
  grey: -0.5,
};
const undertoneWarmth: Record<Undertone, number> = { warm: 2, cool: -2, neutral: 0, olive: 0 };

const lightness = (hex: string) => hexToLab(hex).l;
const skinL = Object.fromEntries(skinOptions.map((o) => [o.value, lightness(o.hex)])) as Record<SkinTone, number>;
const eyeL = Object.fromEntries(eyeOptions.map((o) => [o.value, lightness(o.hex)])) as Record<EyeColour, number>;
const hairL = Object.fromEntries(hairOptions.map((o) => [o.value, lightness(o.hex)])) as Record<HairColour, number>;

function scores({ skinTone, undertone, eyeColour, hairColour }: Colouring) {
  const depth = 0.55 * skinL[skinTone] + 0.3 * hairL[hairColour] + 0.15 * eyeL[eyeColour];
  const gap =
    0.7 * Math.abs(skinL[skinTone] - hairL[hairColour]) +
    0.3 * Math.abs(skinL[skinTone] - eyeL[eyeColour]);
  const clarity = 0.45 * eyeClarity[eyeColour] + 0.3 * hairClarity[hairColour] + 0.25 * Math.min(gap / 60, 1);
  const warmth = undertoneWarmth[undertone] + hairWarmth[hairColour] + eyeWarmth[eyeColour];
  return { depth, gap, clarity, warmth };
}

/**
 * Where the colouring sits on each dimension, 0–1: cool → warm, light → deep,
 * soft → clear and low → high contrast. Same scores as deriveDimensions, so a
 * position past the middle bands agrees with its category.
 */
export function dimensionPositions(colouring: Colouring) {
  const { depth, gap, clarity, warmth } = scores(colouring);
  const unit = (n: number) => Math.min(1, Math.max(0, n));
  return {
    temperature: unit((warmth + 3) / 6.5),
    value: unit((85 - depth) / 70),
    chroma: unit(clarity),
    contrast: unit(gap / 70),
  };
}

/**
 * The four season dimensions, derived from the user's colouring. Value and
 * contrast use the CIE L* lightness of the chosen swatches (overall depth;
 * the hair–skin gap); clarity and temperature use the per-colour scores above.
 * These are practitioner conventions encoded as rules, not a trained model.
 */
export function deriveDimensions(colouring: Colouring): SeasonDimensions {
  const { depth, gap, clarity, warmth } = scores(colouring);
  return {
    temperature: warmth >= 1.5 ? "warm" : warmth <= -1.5 ? "cool" : "neutral",
    value: depth >= 68 ? "light" : depth < 42 ? "deep" : "medium",
    chroma: clarity >= 0.6 ? "bright" : clarity < 0.4 ? "soft" : "medium",
    contrast: gap >= 42 ? "high" : gap < 20 ? "low" : "medium",
  };
}

/**
 * 12-season decision tree: the strongest of light/deep, warm/cool and
 * bright/soft is the dominant characteristic; the secondary one picks between
 * the two seasons that share it (e.g. deep → deep autumn if warm, deep winter
 * if cool).
 */
export function mapColourSeason(colouring: Colouring): ColourSeason {
  const { depth, clarity, warmth } = scores(colouring);
  // Deviation from a neutral middle, scaled so each spans roughly −1..1.
  const lightness = (depth - 58) / 25;
  const warm = warmth / 3;
  const clear = (clarity - 0.45) / 0.35;
  // Exactly neutral leans cool (bright winter, soft summer, deep winter, light summer).
  const warmSide = warm > 0;
  const brightSide = clear >= 0;

  const dominant = Math.max(Math.abs(lightness), Math.abs(warm), Math.abs(clear));
  if (dominant === Math.abs(lightness)) {
    if (lightness > 0) return warmSide ? "light_spring" : "light_summer";
    return warmSide ? "deep_autumn" : "deep_winter";
  }
  if (dominant === Math.abs(warm)) {
    if (warm > 0) return brightSide ? "warm_spring" : "warm_autumn";
    return brightSide ? "cool_winter" : "cool_summer";
  }
  if (clear > 0) return warmSide ? "bright_spring" : "bright_winter";
  return warmSide ? "soft_autumn" : "soft_summer";
}
