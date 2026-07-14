import type { EyeColour, HairColour, SkinTone, Undertone } from "./map.ts";

/**
 * Canonical preset swatches for the four colouring inputs.
 *
 * The `hex` values are the single source of truth shared by two consumers:
 *  - the manual colouring form (rendered as selectable swatches), and
 *  - the photo-detection matcher, which converts each hex to CIE Lab and
 *    matches a detected colour to the nearest preset by ΔE.
 *
 * Keep this browser-free so it stays importable from React Native.
 */
export type ColourOption<T extends string> = {
  value: T;
  label: string;
  hex: string;
};

export const skinOptions: ColourOption<SkinTone>[] = [
  { value: "porcelain", label: "Porcelain", hex: "#F3D8CB" },
  { value: "fair", label: "Fair", hex: "#EBC6B1" },
  { value: "light", label: "Light", hex: "#DDB38F" },
  { value: "medium", label: "Medium", hex: "#C58D66" },
  { value: "tan", label: "Tan", hex: "#A96F3E" },
  { value: "brown", label: "Brown", hex: "#835232" },
  { value: "deep", label: "Deep", hex: "#5B3828" },
  { value: "very_deep", label: "Very deep", hex: "#3B2119" },
];

export const eyeOptions: ColourOption<EyeColour>[] = [
  { value: "blue", label: "Blue", hex: "#6A98B7" },
  { value: "green", label: "Green", hex: "#6F8F5C" },
  { value: "grey", label: "Grey", hex: "#8C8E8B" },
  { value: "hazel", label: "Hazel", hex: "#8B7150" },
  { value: "brown", label: "Brown", hex: "#5C3E26" },
  { value: "amber", label: "Amber", hex: "#B07E2F" },
];

export const undertoneOptions: ColourOption<Undertone>[] = [
  { value: "cool", label: "Cool", hex: "#E7B7BE" },
  { value: "neutral", label: "Neutral", hex: "#D2B49C" },
  { value: "warm", label: "Warm", hex: "#D39A5B" },
  { value: "olive", label: "Olive", hex: "#9F8F57" },
];

export const hairOptions: ColourOption<HairColour>[] = [
  { value: "platinum_blonde", label: "Platinum blonde", hex: "#E6D4A8" },
  { value: "golden_blonde", label: "Golden blonde", hex: "#C9A063" },
  { value: "ash_brown", label: "Ash brown", hex: "#6E5947" },
  { value: "chestnut_brown", label: "Chestnut brown", hex: "#5A2E15" },
  { value: "auburn", label: "Auburn", hex: "#893A1F" },
  { value: "red", label: "Red", hex: "#B8442B" },
  { value: "black", label: "Black", hex: "#1A0F0A" },
  { value: "grey", label: "Grey", hex: "#B3AFA8" },
];
