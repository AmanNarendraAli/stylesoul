// @vitest-environment node
import { describe, expect, it } from "vitest";
import { productInputSchema } from "@/lib/catalogue/schema";
import {
  canonicalSeasons as seasons,
  canonicalShapes as shapes,
  curatedProducts,
  type CuratedProduct,
} from "@/prisma/catalogue";
import {
  CATALOGUE_SEED_SOURCE,
  reconcileCatalogue,
  type ProductSeedRepository,
} from "@/prisma/reconcile-catalogue";

const categories = [
  "dresses",
  "tops",
  "trousers",
  "knitwear",
  "skirts",
  "outerwear",
] as const;

const seasonFamilies = [
  ["light_spring", "warm_spring", "bright_spring"],
  ["light_summer", "cool_summer", "soft_summer"],
  ["soft_autumn", "warm_autumn", "deep_autumn"],
  ["deep_winter", "cool_winter", "bright_winter"],
] as const;

describe("launch catalogue curation", () => {
  it("contains 150 distinct retailer SKUs with valid explicit metadata", () => {
    expect(curatedProducts).toHaveLength(150);

    const retailerSkus = curatedProducts.map((product) => {
      const match = new URL(product.productUrl).pathname.match(
        /\/p\/(clp\d+)$/,
      );
      expect(match, product.productUrl).not.toBeNull();
      return match?.[1];
    });
    expect(new Set(retailerSkus).size).toBe(curatedProducts.length);

    for (const product of curatedProducts) {
      const parsed = productInputSchema.safeParse(product);
      expect(
        parsed.success,
        parsed.success ? product.title : JSON.stringify(parsed.error.issues),
      ).toBe(true);
      expect(product.isAffiliate).toBe(false);
      if (product.title.toLowerCase().includes("dress")) {
        expect(product.garmentCategory, product.title).toBe("dresses");
      }
    }
  });

  it("keeps every shape and subtype ready for one complete exact-match edit", () => {
    for (const shape of shapes) {
      for (const season of seasons) {
        const count = curatedProducts.filter(
          (product) =>
            product.eligibleShapes.includes(shape) &&
            product.eligibleSeasons.includes(season),
        ).length;
        expect(count, `${shape}/${season}`).toBeGreaterThanOrEqual(3);
      }
    }
  });

  it("keeps sibling subtype eligibility distinct", () => {
    for (const family of seasonFamilies) {
      const productSets = family.map((season) =>
        curatedProducts
          .filter((product) => product.eligibleSeasons.includes(season))
          .map((product) => product.productUrl)
          .sort(),
      );

      expect(new Set(productSets.map((set) => JSON.stringify(set))).size).toBe(
        family.length,
      );
      expect(
        curatedProducts.every(
          (product) =>
            product.eligibleSeasons.filter((season) =>
              family.some((member) => member === season),
            ).length < family.length,
        ),
      ).toBe(true);
    }
  });

  it("balances the six supported garment categories", () => {
    for (const category of categories) {
      expect(
        curatedProducts.filter(
          (product) => product.garmentCategory === category,
        ),
        category,
      ).toHaveLength(25);
    }
  });

  it("reconciles only seed-owned variants and is idempotent", async () => {
    type StoredProduct = Omit<CuratedProduct, "status"> & {
      status: "active" | "inactive";
      catalogueSource: string | null;
    };

    const rows = new Map<string, StoredProduct>();
    const obsoleteUrl = new URL(curatedProducts[0].productUrl);
    obsoleteUrl.searchParams.set("color", "OBSOLETE");
    rows.set(obsoleteUrl.toString(), {
      ...curatedProducts[0],
      productUrl: obsoleteUrl.toString(),
      catalogueSource: CATALOGUE_SEED_SOURCE,
    });
    const adminUrl = "https://shop.example.com/admin-created-product";
    rows.set(adminUrl, {
      ...curatedProducts[0],
      brand: "Independent",
      title: "Admin-created product",
      productUrl: adminUrl,
      catalogueSource: null,
    });

    const calls: string[] = [];
    const repository: ProductSeedRepository = {
      async upsert({ where, create }) {
        calls.push(`upsert:${where.productUrl}`);
        rows.set(where.productUrl, { ...create });
      },
      async updateMany({ where }) {
        calls.push("deactivate");
        const currentUrls = new Set(where.productUrl.notIn);
        for (const [productUrl, product] of rows) {
          if (
            product.catalogueSource === where.catalogueSource &&
            !currentUrls.has(productUrl)
          ) {
            rows.set(productUrl, { ...product, status: "inactive" });
          }
        }
      },
      async findMany({ where }) {
        calls.push("coverage");
        return [...rows.values()]
          .filter(
            (product) =>
              product.status === where.status &&
              product.catalogueSource === where.catalogueSource,
          )
          .map((product) => ({
            brand: product.brand,
            eligibleShapes: product.eligibleShapes,
            eligibleSeasons: product.eligibleSeasons,
          }));
      },
    };

    const expectedSeedUrls = new Set(
      curatedProducts.map((product) => product.productUrl),
    );
    const assertReconciliation = async () => {
      calls.length = 0;
      const activeProducts = await reconcileCatalogue(
        repository,
        curatedProducts,
      );
      const activeSeedUrls = [...rows.entries()]
        .filter(
          ([, product]) =>
            product.status === "active" &&
            product.catalogueSource === CATALOGUE_SEED_SOURCE,
        )
        .map(([productUrl]) => productUrl);

      expect(new Set(activeSeedUrls)).toEqual(expectedSeedUrls);
      expect(activeProducts).toHaveLength(curatedProducts.length);
      expect(
        calls
          .slice(0, curatedProducts.length)
          .every((entry) => entry.startsWith("upsert:")),
      ).toBe(true);
      expect(calls.at(-2)).toBe("deactivate");
      expect(calls.at(-1)).toBe("coverage");
    };

    await assertReconciliation();
    expect(rows.get(obsoleteUrl.toString())?.status).toBe("inactive");
    expect(rows.get(adminUrl)?.status).toBe("active");
    await assertReconciliation();
  });

  it("waits for successful upserts before retiring seed rows", async () => {
    const calls: string[] = [];
    let resolveUpsert!: () => void;
    const pendingUpsert = new Promise<void>((resolve) => {
      resolveUpsert = resolve;
    });
    const repository: ProductSeedRepository = {
      upsert() {
        calls.push("upsert");
        return pendingUpsert;
      },
      async updateMany() {
        calls.push("deactivate");
      },
      async findMany() {
        calls.push("coverage");
        return [];
      },
    };

    const reconciliation = reconcileCatalogue(
      repository,
      curatedProducts.slice(0, 1),
    );
    await Promise.resolve();
    expect(calls).toEqual(["upsert"]);
    resolveUpsert();
    await reconciliation;
    expect(calls).toEqual(["upsert", "deactivate", "coverage"]);

    calls.length = 0;
    let rejectUpsert!: (error: Error) => void;
    const failingUpsert = new Promise<void>((_, reject) => {
      rejectUpsert = reject;
    });
    const failingRepository: ProductSeedRepository = {
      upsert() {
        calls.push("upsert");
        return failingUpsert;
      },
      async updateMany() {
        calls.push("deactivate");
      },
      async findMany() {
        calls.push("coverage");
        return [];
      },
    };
    const failedReconciliation = reconcileCatalogue(
      failingRepository,
      curatedProducts.slice(0, 1),
    );
    const rejection = expect(failedReconciliation).rejects.toThrow(
      "upsert failed",
    );
    await Promise.resolve();
    expect(calls).toEqual(["upsert"]);
    rejectUpsert(new Error("upsert failed"));
    await rejection;
    expect(calls).toEqual(["upsert"]);
  });
});
