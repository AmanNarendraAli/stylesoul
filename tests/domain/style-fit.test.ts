// @vitest-environment node
import { describe, expect, it } from "vitest";
import {
  selectWeeklyProducts,
  styleFit,
  styleFitReasons,
  type RecommendationProduct,
} from "@/lib/recommendations/select";
import { metalGuidance, preferredMetal } from "@/lib/style-guidance/metals";

const garment = (
  id: string,
  details: Partial<RecommendationProduct> = {},
): RecommendationProduct => ({
  id,
  brand: `Brand ${id}`,
  eligibleShapes: ["hourglass"],
  eligibleSeasons: ["warm_spring"],
  priceTier: "mid",
  ...details,
});

// Compact face with straight lines, warm colouring.
const profile = {
  bodyShape: "hourglass",
  colourSeason: "warm_spring",
  faceLength: 0,
  faceLines: 1,
  temperature: "warm",
};

describe("metals", () => {
  it("favours gold for warm colouring, silver for cool, and neither for neutral", () => {
    expect(preferredMetal("warm")).toBe("gold");
    expect(preferredMetal("cool")).toBe("silver");
    expect(preferredMetal("neutral")).toBeNull();
  });

  it("picks the finish from clarity, with rose gold for neutral colouring", () => {
    const names = (temperature: "warm" | "cool" | "neutral", chroma: "bright" | "medium" | "soft") =>
      metalGuidance(temperature, chroma).finishes.map((finish) => finish.name);

    expect(names("warm", "soft")).toEqual(["Antique gold", "Bronze"]);
    expect(names("cool", "bright")).toEqual(["Polished silver", "Platinum"]);
    expect(names("neutral", "medium")).toEqual(["Rose gold", "Yellow gold", "Silver"]);
  });
});

describe("style fit", () => {
  it("adds face and metal fit, and is neutral without a photo or details", () => {
    const suits = garment("a", { neckline: "v", pattern: "geometric", drape: "crisp", metal: "gold" });

    expect(styleFit(suits, profile)).toBe(5);
    expect(styleFit(garment("b", { metal: "silver" }), profile)).toBe(-1);
    expect(styleFit(suits, { bodyShape: null, colourSeason: "warm_spring" })).toBe(0);
  });

  it("explains a match in short reasons", () => {
    expect(
      styleFitReasons(garment("a", { neckline: "v", pattern: "floral", metal: "gold" }), profile),
    ).toEqual(["V neck for your face", "Gold suits your colouring"]);
  });

  it("keeps the edit clothing-led, with at most one finishing piece", () => {
    const products = [
      ...["j1", "j2", "j3"].map((id) => garment(id, { garmentCategory: "jewellery", metal: "gold" })),
      garment("k1", { garmentCategory: "kurtas" }),
      garment("k2", { garmentCategory: "sarees" }),
    ];

    const picked = selectWeeklyProducts({
      products,
      profile,
      excludedProductIds: new Set(),
      userId: "user-1",
      weekStart: new Date("2026-10-12T00:00:00.000Z"),
    });

    expect(picked.filter((product) => product.garmentCategory === "jewellery")).toHaveLength(1);
    expect(picked.map((product) => product.id)).toEqual(expect.arrayContaining(["k1", "k2"]));
  });

  it("puts the best-fitting eligible products into the weekly edit", () => {
    const products = [
      ...["p1", "p2", "p3"].map((id) => garment(id, { neckline: "sweetheart", drape: "fluid" })),
      ...["s1", "s2", "s3"].map((id) => garment(id, { neckline: "v", drape: "crisp" })),
    ];

    const picked = selectWeeklyProducts({
      products,
      profile,
      excludedProductIds: new Set(),
      userId: "user-1",
      weekStart: new Date("2026-10-12T00:00:00.000Z"),
    });

    expect(picked.map((product) => product.id).sort()).toEqual(["s1", "s2", "s3"]);
  });
});
