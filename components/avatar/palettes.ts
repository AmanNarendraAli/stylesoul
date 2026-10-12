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
  triangle: { shoulders: 60, bust: 64, waist: 52, hips: 80, hem: 96 },
  full_midsection: { shoulders: 72, bust: 76, waist: 70, hips: 70, hem: 80 },
  rectangle: { shoulders: 66, bust: 68, waist: 60, hips: 68, hem: 82 },
  inverted_triangle: { shoulders: 80, bust: 72, waist: 54, hips: 62, hem: 76 },
};

/** Used when no measurements were given, so no silhouette is implied. */
export const NEUTRAL_PROPORTIONS: ShapeProportions = {
  shoulders: 68,
  bust: 68,
  waist: 56,
  hips: 70,
  hem: 84,
};

export type SeasonPalette = {
  skin: string;
  top: string;
  bottom: string;
  accent: string;
  pulse: string;
};

export const SEASON_PALETTES: Record<ColourSeason, SeasonPalette> = {
  light_spring: {
    skin: "#F5D9B8",
    top: "#F2C9A0",
    bottom: "#C9A377",
    accent: "#F0A868",
    pulse: "#F2C9A0",
  },
  warm_spring: {
    skin: "#F0CFA6",
    top: "#E4A977",
    bottom: "#A87C5A",
    accent: "#D9883A",
    pulse: "#E4A977",
  },
  bright_spring: {
    skin: "#F0C9A0",
    top: "#E88C4A",
    bottom: "#9A5A2E",
    accent: "#F26B4E",
    pulse: "#F26B4E",
  },
  light_summer: {
    skin: "#EED3C2",
    top: "#B7C6D9",
    bottom: "#7E93AB",
    accent: "#C9B6D9",
    pulse: "#B7C6D9",
  },
  cool_summer: {
    skin: "#E8C8B6",
    top: "#9CB1C4",
    bottom: "#5C7B95",
    accent: "#B8A3C2",
    pulse: "#9CB1C4",
  },
  soft_summer: {
    skin: "#E2C3B2",
    top: "#9AA5AC",
    bottom: "#65727B",
    accent: "#A8909F",
    pulse: "#9AA5AC",
  },
  soft_autumn: {
    skin: "#D8AE8E",
    top: "#B09678",
    bottom: "#7A6650",
    accent: "#C08A5E",
    pulse: "#C08A5E",
  },
  warm_autumn: {
    skin: "#C49371",
    top: "#8B4A2B",
    bottom: "#5D3A1F",
    accent: "#C1722F",
    pulse: "#C1722F",
  },
  deep_autumn: {
    skin: "#A8724F",
    top: "#6B3A22",
    bottom: "#3E2415",
    accent: "#A64B2A",
    pulse: "#A64B2A",
  },
  deep_winter: {
    skin: "#8A5A40",
    top: "#363D66",
    bottom: "#141A2E",
    accent: "#7D2440",
    pulse: "#7D2440",
  },
  cool_winter: {
    skin: "#9C6A4F",
    top: "#3A4066",
    bottom: "#16182B",
    accent: "#A02633",
    pulse: "#A02633",
  },
  bright_winter: {
    skin: "#B07A58",
    top: "#31356E",
    bottom: "#1B1D3A",
    accent: "#C42B4C",
    pulse: "#C42B4C",
  },
};
