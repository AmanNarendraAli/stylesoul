import type { Metal } from "../catalogue/schema.ts";
import type { Chroma, Temperature } from "../colour-season/map.ts";

/**
 * Jewellery, zari and hardware metals from the colouring: warm colouring
 * suits gold, cool suits silver, neutral wears both. Clarity picks the
 * finish: polished for clear colouring, antique or oxidised for soft.
 */

export type MetalFinish = { name: string; from: string; to: string };

const FINISHES = {
  yellowGold: { name: "Yellow gold", from: "#F7DC7A", to: "#B8860B" },
  brass: { name: "Polished brass", from: "#F2D48A", to: "#A67C2E" },
  antiqueGold: { name: "Antique gold", from: "#CDAA63", to: "#7A5C2E" },
  bronze: { name: "Bronze", from: "#F0C08A", to: "#6E4424" },
  silver: { name: "Silver", from: "#F1F2F4", to: "#9AA0A8" },
  polishedSilver: { name: "Polished silver", from: "#FFFFFF", to: "#A9B1BC" },
  platinum: { name: "Platinum", from: "#ECEEF2", to: "#8C93A0" },
  whiteGold: { name: "White gold", from: "#F4F1EA", to: "#A8A49B" },
  oxidisedSilver: { name: "Oxidised silver", from: "#B9BCC0", to: "#4B4F55" },
  pewter: { name: "Pewter", from: "#C5C6C2", to: "#6F716D" },
  roseGold: { name: "Rose gold", from: "#F4C6B4", to: "#B76E5A" },
} satisfies Record<string, MetalFinish>;

const BY_CHROMA: Record<"gold" | "silver", Record<Chroma, [MetalFinish, MetalFinish]>> = {
  gold: {
    bright: [FINISHES.yellowGold, FINISHES.brass],
    medium: [FINISHES.yellowGold, FINISHES.antiqueGold],
    soft: [FINISHES.antiqueGold, FINISHES.bronze],
  },
  silver: {
    bright: [FINISHES.polishedSilver, FINISHES.platinum],
    medium: [FINISHES.silver, FINISHES.whiteGold],
    soft: [FINISHES.oxidisedSilver, FINISHES.pewter],
  },
};

const EXPLAINERS = {
  gold: "Gold jewellery, zari and buttons warm your skin. Silver can look cold on you.",
  silver: "Silver jewellery and zari suit you better than yellow gold.",
  both: "Both gold and silver suit you, and rose gold sits between them.",
};

/** The metal a profile favours, or null when both suit it. */
export function preferredMetal(temperature: string | null): Metal | null {
  if (temperature === "warm") return "gold";
  if (temperature === "cool") return "silver";
  return null;
}

export function metalGuidance(temperature: Temperature, chroma: Chroma) {
  const metal = preferredMetal(temperature);
  if (metal) {
    return { finishes: BY_CHROMA[metal][chroma], explainer: EXPLAINERS[metal] };
  }
  return {
    finishes: [FINISHES.roseGold, BY_CHROMA.gold[chroma][0], BY_CHROMA.silver[chroma][0]],
    explainer: EXPLAINERS.both,
  };
}
