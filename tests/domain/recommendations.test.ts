// @vitest-environment node
import { describe, expect, it } from "vitest";
import {
  mondayUtc,
  selectWeeklyProducts,
  type RecommendationProduct,
} from "@/lib/recommendations/select";

function product(
  id: string,
  {
    brand = `Brand ${id}`,
    shapes = ["hourglass"],
    seasons = ["warm_spring"],
    tier = "mid",
  }: {
    brand?: string;
    shapes?: string[];
    seasons?: string[];
    tier?: string;
  } = {},
): RecommendationProduct {
  return {
    id,
    brand,
    eligibleShapes: shapes,
    eligibleSeasons: seasons,
    priceTier: tier,
  };
}

const baseSelection = {
  profile: { bodyShape: "hourglass", colourSeason: "warm_spring" },
  userId: "user-1",
  weekStart: new Date("2026-07-13T00:00:00.000Z"),
};

describe("weekly recommendation selection", () => {
  it("normalises any date to Monday 00:00 UTC", () => {
    expect(mondayUtc(new Date("2026-07-19T23:59:59.000Z")).toISOString()).toBe(
      "2026-07-13T00:00:00.000Z",
    );
    expect(mondayUtc(new Date("2026-07-13T12:00:00.000Z")).toISOString()).toBe(
      "2026-07-13T00:00:00.000Z",
    );
  });

  it("is stable and selects eligible products with brand and tier diversity", () => {
    const products = [
      product("a", { tier: "entry" }),
      product("b", { tier: "mid" }),
      product("c", { tier: "premium" }),
      product("d", { brand: "Brand a", tier: "premium" }),
    ];
    const first = selectWeeklyProducts({
      ...baseSelection,
      products,
      excludedProductIds: new Set(),
    });
    const second = selectWeeklyProducts({
      ...baseSelection,
      products,
      excludedProductIds: new Set(),
    });

    expect(second.map(({ id }) => id)).toEqual(first.map(({ id }) => id));
    expect(first).toHaveLength(3);
    expect(new Set(first.map(({ brand }) => brand.toLowerCase())).size).toBe(3);
    expect(new Set(first.map(({ priceTier }) => priceTier)).size).toBe(3);
    expect(
      first.every(
        (item) =>
          item.eligibleShapes.includes("hourglass") &&
          item.eligibleSeasons.includes("warm_spring"),
      ),
    ).toBe(true);
  });

  it("ranks an exact season subtype ahead of its season family", () => {
    const selected = selectWeeklyProducts({
      ...baseSelection,
      products: [
        product("family", { seasons: ["light_spring"] }),
        product("exact"),
      ],
      excludedProductIds: new Set(),
      count: 1,
    });

    expect(selected.map(({ id }) => id)).toEqual(["exact"]);
  });

  it("prefers a fresh season-family match to a historical exact subtype", () => {
    const selected = selectWeeklyProducts({
      ...baseSelection,
      products: [
        product("historical-exact"),
        product("fresh-family", { seasons: ["light_spring"] }),
      ],
      excludedProductIds: new Set(["historical-exact"]),
      count: 1,
    });

    expect(selected.map(({ id }) => id)).toEqual(["fresh-family"]);
  });

  it("ranks a same-shape season family ahead of unrelated matches", () => {
    const selected = selectWeeklyProducts({
      ...baseSelection,
      products: [
        product("unrelated-shape-match", { seasons: ["cool_winter"] }),
        product("unrelated-season-match", {
          shapes: ["triangle"],
          seasons: ["warm_spring"],
        }),
        product("fallback", {
          shapes: ["triangle"],
          seasons: ["cool_winter"],
        }),
        product("family", { seasons: ["light_spring"] }),
      ],
      excludedProductIds: new Set(),
      count: 1,
    });

    expect(selected.map(({ id }) => id)).toEqual(["family"]);
  });

  it("keeps an exact-season wrong-shape product in the partial pool", () => {
    const selected = selectWeeklyProducts({
      ...baseSelection,
      products: [
        product("fallback", {
          shapes: ["triangle"],
          seasons: ["cool_winter"],
        }),
        product("season-only", {
          shapes: ["triangle"],
          seasons: ["warm_spring"],
        }),
      ],
      excludedProductIds: new Set(),
      count: 1,
    });

    expect(selected.map(({ id }) => id)).toEqual(["season-only"]);
  });

  it("excludes eight-week history while three fresh eligible products exist", () => {
    const products = ["a", "b", "c", "d", "e", "f"].map((id) => product(id));
    const selected = selectWeeklyProducts({
      ...baseSelection,
      products,
      excludedProductIds: new Set(["a", "b", "c"]),
    });

    expect(selected.map(({ id }) => id).sort()).toEqual(["d", "e", "f"]);
  });

  it("relaxes history before shape and season eligibility", () => {
    const strict = [product("a"), product("b"), product("c")];
    const partial = product("d", {
      shapes: ["hourglass"],
      seasons: ["cool_winter"],
    });
    const selected = selectWeeklyProducts({
      ...baseSelection,
      products: [...strict, partial],
      excludedProductIds: new Set(strict.map(({ id }) => id)),
    });

    expect(selected).toHaveLength(3);
    expect(selected.every(({ id }) => id !== partial.id)).toBe(true);
  });

  it("relaxes eligibility and finally brand diversity for a thin catalogue", () => {
    const selected = selectWeeklyProducts({
      ...baseSelection,
      products: [
        product("a", { brand: "Only Brand" }),
        product("b", { brand: "Only Brand" }),
        product("c", {
          brand: "Only Brand",
          shapes: ["triangle"],
          seasons: ["cool_winter"],
        }),
      ],
      excludedProductIds: new Set(),
    });

    expect(selected).toHaveLength(3);
    expect(new Set(selected.map(({ id }) => id)).size).toBe(3);
    expect(selected.some(({ id }) => id === "c")).toBe(true);
  });

  describe("without a body shape", () => {
    const seasonOnly = {
      ...baseSelection,
      profile: { bodyShape: null, colourSeason: "warm_spring" },
    };

    it("selects on colour season regardless of eligible shapes", () => {
      const selected = selectWeeklyProducts({
        ...seasonOnly,
        products: [
          product("other-season", { seasons: ["cool_winter"] }),
          product("a", { shapes: ["triangle"], tier: "entry" }),
          product("b", { shapes: ["rectangle"], tier: "mid" }),
          product("c", { shapes: ["inverted_triangle"], tier: "premium" }),
        ],
        excludedProductIds: new Set(),
      });

      expect(selected.map(({ id }) => id).sort()).toEqual(["a", "b", "c"]);
    });

    it("ranks the season family ahead of unrelated seasons", () => {
      const selected = selectWeeklyProducts({
        ...seasonOnly,
        products: [
          product("unrelated", { seasons: ["cool_winter"] }),
          product("family", { shapes: ["triangle"], seasons: ["light_spring"] }),
        ],
        excludedProductIds: new Set(),
        count: 1,
      });

      expect(selected.map(({ id }) => id)).toEqual(["family"]);
    });

    it("prefers a fresh season-family match to a historical season match", () => {
      const selected = selectWeeklyProducts({
        ...seasonOnly,
        products: [
          product("historical-exact", { shapes: ["triangle"] }),
          product("fresh-family", {
            shapes: ["rectangle"],
            seasons: ["light_spring"],
          }),
        ],
        excludedProductIds: new Set(["historical-exact"]),
        count: 1,
      });

      expect(selected.map(({ id }) => id)).toEqual(["fresh-family"]);
    });

    it("keeps history exclusion and brand diversity", () => {
      const products = [
        product("a", { brand: "Shared" }),
        product("b", { brand: "Shared" }),
        product("c"),
        product("d"),
        product("e"),
      ];
      const selected = selectWeeklyProducts({
        ...seasonOnly,
        products,
        excludedProductIds: new Set(["e"]),
      });

      expect(selected).toHaveLength(3);
      expect(selected.some(({ id }) => id === "e")).toBe(false);
      expect(new Set(selected.map(({ brand }) => brand)).size).toBe(3);
    });
  });
});
