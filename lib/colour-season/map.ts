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
  "warm_spring",
  "warm_autumn",
  "cool_summer",
  "cool_winter",
] as const;

export type SkinTone = (typeof skinTones)[number];
export type EyeColour = (typeof eyeColours)[number];
export type HairColour = (typeof hairColours)[number];
export type Undertone = (typeof undertones)[number];
export type ColourSeason = (typeof colourSeasons)[number];

export const colouringSchema = z.object({
  skinTone: z.enum(skinTones),
  undertone: z.enum(undertones),
  eyeColour: z.enum(eyeColours),
  hairColour: z.enum(hairColours),
});

export type Colouring = z.infer<typeof colouringSchema>;

type SeasonUndertone = "warm" | "cool";
type Value = "light" | "dark";

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

function deriveSeasonUndertone({
  undertone,
  skinTone,
  hairColour,
  eyeColour,
}: Colouring): SeasonUndertone {
  if (undertone === "warm") return "warm";
  if (undertone === "cool") return "cool";

  let warmth = 0;

  warmth += undertone === "olive" ? 2 : 0;
  warmth += skinTone === "tan" || skinTone === "brown" ? 1 : 0;
  warmth += warmHairColours.has(hairColour) ? 1 : -1;
  warmth += eyeColour === "amber" || eyeColour === "hazel" ? 1 : 0;

  return warmth >= 0 ? "warm" : "cool";
}

function deriveValue({ skinTone, hairColour, eyeColour }: Colouring): Value {
  let depth = 0;

  depth += skinTone === "deep" || skinTone === "very_deep" ? 2 : 0;
  depth += skinTone === "medium" || skinTone === "tan" || skinTone === "brown" ? 1 : 0;
  depth += lightHairColours.has(hairColour) ? -1 : 1;
  depth += lightEyeColours.has(eyeColour) ? -1 : 1;

  return depth >= 1 ? "dark" : "light";
}

export function mapColourSeason(colouring: Colouring): ColourSeason {
  const undertone = deriveSeasonUndertone(colouring);
  const value = deriveValue(colouring);

  if (undertone === "warm") {
    return value === "light" ? "warm_spring" : "warm_autumn";
  }

  return value === "light" ? "cool_summer" : "cool_winter";
}
