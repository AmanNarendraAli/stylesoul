import { z } from "zod";

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

export const colouringSchema = z.object({
  skinTone: z.enum(skinTones),
  undertone: z.enum(undertones),
  eyeColour: z.enum(eyeColours),
  hairColour: z.enum(hairColours),
});

export type Colouring = z.infer<typeof colouringSchema>;

export const seasonDimensionsSchema = z.object({
  temperature: z.enum(temperatures),
  value: z.enum(values),
  chroma: z.enum(chromas),
  contrast: z.enum(contrasts),
});

export type SeasonDimensions = z.infer<typeof seasonDimensionsSchema>;

type SeasonPrototype = SeasonDimensions & { season: ColourSeason };

/**
 * These are practitioner styling prototypes, not scientifically validated
 * biological classes. A season is the nearest prototype after combining the
 * four confirmed comparisons with coarse natural-colouring signals.
 */
export const seasonPrototypes: readonly SeasonPrototype[] = [
  { season: "light_spring", temperature: "warm", value: "light", chroma: "bright", contrast: "medium" },
  { season: "warm_spring", temperature: "warm", value: "medium", chroma: "bright", contrast: "medium" },
  { season: "bright_spring", temperature: "warm", value: "light", chroma: "bright", contrast: "high" },
  { season: "light_summer", temperature: "cool", value: "light", chroma: "soft", contrast: "low" },
  { season: "cool_summer", temperature: "cool", value: "medium", chroma: "soft", contrast: "low" },
  { season: "soft_summer", temperature: "neutral", value: "medium", chroma: "soft", contrast: "low" },
  { season: "soft_autumn", temperature: "neutral", value: "medium", chroma: "soft", contrast: "medium" },
  { season: "warm_autumn", temperature: "warm", value: "medium", chroma: "soft", contrast: "medium" },
  { season: "deep_autumn", temperature: "warm", value: "deep", chroma: "soft", contrast: "high" },
  { season: "deep_winter", temperature: "cool", value: "deep", chroma: "bright", contrast: "high" },
  { season: "cool_winter", temperature: "cool", value: "medium", chroma: "bright", contrast: "high" },
  { season: "bright_winter", temperature: "neutral", value: "medium", chroma: "bright", contrast: "high" },
] as const;

const warmHairColours: Partial<Record<HairColour, true>> = {
  golden_blonde: true,
  chestnut_brown: true,
  auburn: true,
  red: true,
};
const lightHairColours: Partial<Record<HairColour, true>> = {
  platinum_blonde: true,
  golden_blonde: true,
  grey: true,
};
const lightEyeColours: Partial<Record<EyeColour, true>> = {
  blue: true,
  green: true,
  grey: true,
};
const deepSkinTones: Partial<Record<SkinTone, true>> = {
  deep: true,
  very_deep: true,
};
const mediumSkinTones: Partial<Record<SkinTone, true>> = {
  medium: true,
  tan: true,
  brown: true,
};

function deriveNaturalDimensions({
  undertone,
  skinTone,
  hairColour,
  eyeColour,
}: Colouring): SeasonDimensions {
  let warmth = undertone === "warm" ? 2 : undertone === "cool" ? -2 : 0;
  warmth += undertone === "olive" ? 1 : 0;
  warmth += warmHairColours[hairColour] ? 1 : 0;
  warmth += eyeColour === "amber" || eyeColour === "hazel" ? 1 : 0;
  warmth += skinTone === "tan" || skinTone === "brown" ? 1 : 0;

  let depth = deepSkinTones[skinTone]
    ? 2
    : mediumSkinTones[skinTone]
      ? 1
      : 0;
  depth += lightHairColours[hairColour] ? -1 : hairColour === "black" ? 1 : 0;
  depth += lightEyeColours[eyeColour] ? -1 : 1;

  const temperature: Temperature =
    warmth > 1 ? "warm" : warmth < -1 ? "cool" : "neutral";
  const value: Value = depth > 1 ? "deep" : depth < 0 ? "light" : "medium";
  const chroma: Chroma =
    (eyeColour === "blue" || eyeColour === "green" || eyeColour === "amber") &&
    (hairColour === "platinum_blonde" || hairColour === "black" || hairColour === "red")
      ? "bright"
      : "soft";
  const contrast: Contrast =
    (value === "deep" && lightEyeColours[eyeColour]) ||
    (value === "light" && hairColour === "black")
      ? "high"
      : value === "medium"
        ? "medium"
        : "low";

  return { temperature, value, chroma, contrast };
}

const dimensionKeys = ["temperature", "value", "chroma", "contrast"] as const;

export function mapColourSeason(
  colouring: Colouring,
  dimensions: SeasonDimensions,
): ColourSeason {
  const natural = deriveNaturalDimensions(colouring);

  return seasonPrototypes.reduce((nearest, prototype) => {
    const distance = dimensionKeys.reduce(
      (total, key) =>
        total +
        (prototype[key] === dimensions[key] ? 0 : 4) +
        (prototype[key] === natural[key] ? 0 : 1),
      0,
    );
    return distance < nearest.distance ? { prototype, distance } : nearest;
  }, { prototype: seasonPrototypes[0], distance: Number.POSITIVE_INFINITY }).prototype.season;
}
