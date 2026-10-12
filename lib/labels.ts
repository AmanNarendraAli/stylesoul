import type { BodyShape } from "@/lib/body-shape/classify";
import type { ColourSeason } from "@/lib/colour-season/map";

export const SHAPE_LABELS: Record<BodyShape, string> = {
  hourglass: "Hourglass",
  triangle: "Triangle",
  full_midsection: "Oval",
  rectangle: "Rectangle",
  inverted_triangle: "Inverted triangle",
};

export const SEASON_LABELS: Record<ColourSeason, string> = {
  light_spring: "Light spring",
  warm_spring: "Warm spring",
  bright_spring: "Bright spring",
  light_summer: "Light summer",
  cool_summer: "Cool summer",
  soft_summer: "Soft summer",
  soft_autumn: "Soft autumn",
  warm_autumn: "Warm autumn",
  deep_autumn: "Deep autumn",
  deep_winter: "Deep winter",
  cool_winter: "Cool winter",
  bright_winter: "Bright winter",
};
