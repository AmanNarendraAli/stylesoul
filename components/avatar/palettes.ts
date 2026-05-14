import type { BodyShape } from "@/lib/body-shape/classify";
import type { ColourSeason } from "@/lib/colour-season/map";

export type ShapeProportions = {
  shoulders: number;
  bust: number;
  waist: number;
  hips: number;
  hem: number;
};

export const SHAPE_PROPORTIONS: Record<BodyShape, ShapeProportions> = {
  hourglass: { shoulders: 70, bust: 72, waist: 44, hips: 72, hem: 86 },
  pear: { shoulders: 60, bust: 64, waist: 52, hips: 80, hem: 96 },
  apple: { shoulders: 72, bust: 76, waist: 70, hips: 70, hem: 80 },
  rectangle: { shoulders: 66, bust: 68, waist: 60, hips: 68, hem: 82 },
  inverted_triangle: { shoulders: 80, bust: 72, waist: 54, hips: 62, hem: 76 },
};

export type SeasonPalette = {
  skin: string;
  top: string;
  bottom: string;
  accent: string;
  pulse: string;
};

export const SEASON_PALETTES: Record<ColourSeason, SeasonPalette> = {
  warm_spring: {
    skin: "#F0CFA6",
    top: "#E4A977",
    bottom: "#A87C5A",
    accent: "#D9883A",
    pulse: "#E4A977",
  },
  warm_autumn: {
    skin: "#C49371",
    top: "#8B4A2B",
    bottom: "#5D3A1F",
    accent: "#C1722F",
    pulse: "#C1722F",
  },
  cool_summer: {
    skin: "#E8C8B6",
    top: "#9CB1C4",
    bottom: "#5C7B95",
    accent: "#B8A3C2",
    pulse: "#9CB1C4",
  },
  cool_winter: {
    skin: "#9C6A4F",
    top: "#2A2F4A",
    bottom: "#16182B",
    accent: "#A02633",
    pulse: "#A02633",
  },
};

export const SHAPE_LABELS: Record<BodyShape, string> = {
  hourglass: "Hourglass",
  pear: "Pear",
  apple: "Apple",
  rectangle: "Rectangle",
  inverted_triangle: "Inverted triangle",
};

export const SEASON_LABELS: Record<ColourSeason, string> = {
  warm_spring: "Warm spring",
  warm_autumn: "Warm autumn",
  cool_summer: "Cool summer",
  cool_winter: "Cool winter",
};
