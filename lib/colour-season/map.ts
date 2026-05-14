import { z } from "zod";

export const skinTones = [
  "fair_cool",
  "fair_warm",
  "light_neutral",
  "medium_cool",
  "medium_warm",
  "olive",
  "deep_cool",
  "deep_warm",
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

export const colourSeasons = [
  "warm_spring",
  "warm_autumn",
  "cool_summer",
  "cool_winter",
] as const;

export type SkinTone = (typeof skinTones)[number];
export type EyeColour = (typeof eyeColours)[number];
export type HairColour = (typeof hairColours)[number];
export type ColourSeason = (typeof colourSeasons)[number];

export const colouringSchema = z.object({
  skinTone: z.enum(skinTones),
  eyeColour: z.enum(eyeColours),
  hairColour: z.enum(hairColours),
});

export type Colouring = z.infer<typeof colouringSchema>;

type Undertone = "warm" | "cool";
type Value = "light" | "dark";

const warmSkinTones = new Set<SkinTone>([
  "fair_warm",
  "medium_warm",
  "olive",
  "deep_warm",
]);

const warmHairColours = new Set<HairColour>([
  "golden_blonde",
  "chestnut_brown",
  "auburn",
  "red",
]);

const lightHairColours = new Set<HairColour>([
  "platinum_blonde",
  "golden_blonde",
  "grey",
]);

const lightEyeColours = new Set<EyeColour>(["blue", "green", "grey"]);

function deriveUndertone({
  skinTone,
  hairColour,
  eyeColour,
}: Colouring): Undertone {
  let warmth = 0;

  warmth += warmSkinTones.has(skinTone) ? 2 : -2;
  warmth += warmHairColours.has(hairColour) ? 1 : -1;
  warmth += eyeColour === "amber" || eyeColour === "hazel" ? 1 : 0;

  return warmth >= 0 ? "warm" : "cool";
}

function deriveValue({ skinTone, hairColour, eyeColour }: Colouring): Value {
  let depth = 0;

  depth += skinTone.startsWith("deep") ? 2 : 0;
  depth += skinTone.startsWith("medium") || skinTone === "olive" ? 1 : 0;
  depth += lightHairColours.has(hairColour) ? -1 : 1;
  depth += lightEyeColours.has(eyeColour) ? -1 : 1;

  return depth >= 1 ? "dark" : "light";
}

export function mapColourSeason(colouring: Colouring): ColourSeason {
  const undertone = deriveUndertone(colouring);
  const value = deriveValue(colouring);

  if (undertone === "warm") {
    return value === "light" ? "warm_spring" : "warm_autumn";
  }

  return value === "light" ? "cool_summer" : "cool_winter";
}
