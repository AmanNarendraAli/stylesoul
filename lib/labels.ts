import type { BodyShape } from "@/lib/body-shape/classify";
import type { GarmentCategory, Neckline } from "@/lib/catalogue/schema";
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

export const CATEGORY_LABELS: Record<GarmentCategory, string> = {
  kurtas: "Kurtas",
  kurta_sets: "Kurta sets",
  sarees: "Sarees",
  tops: "Tops",
  knitwear: "Knitwear",
  dresses: "Dresses",
  trousers: "Trousers",
  skirts: "Skirts",
  co_ords: "Co-ords",
  outerwear: "Jackets",
  dupattas: "Dupattas",
  jewellery: "Jewellery",
  shoes: "Shoes",
  accessories: "Bags",
};

export const NECKLINE_LABELS: Record<Neckline, string> = {
  v: "V neck",
  round: "Round neck",
  scoop: "Scoop neck",
  square: "Square neck",
  boat: "Boat neck",
  sweetheart: "Sweetheart",
  collar: "Collar",
  mandarin: "Mandarin collar",
  high: "High neck",
  cowl: "Cowl neck",
  off_shoulder: "Off-shoulder",
};
