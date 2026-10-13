import { isColourSeason, type ColourSeason } from "../colour-season/map.ts";
import type { Neckline } from "../catalogue/schema.ts";
import { faceFit, faceGuidance, necklineFit, type GarmentDetails } from "../face-shape/guidance.ts";
import { NECKLINE_LABELS } from "../labels.ts";
import { preferredMetal } from "../style-guidance/metals.ts";

export type RecommendationProfile = {
  /** Null when no measurements were given: selection uses season only. */
  bodyShape: string | null;
  colourSeason: string;
  /** Face positions from a photo; null without one. */
  faceLength?: number | null;
  faceLines?: number | null;
  temperature?: string | null;
};

export type RecommendationProduct = GarmentDetails & {
  id: string;
  brand: string;
  eligibleShapes: string[];
  eligibleSeasons: string[];
  priceTier: string;
  garmentCategory?: string;
  metal?: string | null;
};

// Pieces that finish an outfit rather than make one; an edit has at most one
// until the catalogue is too thin to fill it otherwise.
const FINISHING_CATEGORIES = new Set(["jewellery", "shoes", "accessories", "dupattas"]);
const isFinishing = (product: RecommendationProduct) =>
  FINISHING_CATEGORIES.has(product.garmentCategory ?? "");

/**
 * How well a product's neckline, print, fabric and metal suit the profile's
 * face and colouring: positive suits, negative works against, 0 is neutral.
 */
export function styleFit(product: RecommendationProduct, profile: RecommendationProfile) {
  let score = 0;
  if (profile.faceLength != null && profile.faceLines != null) {
    score += faceFit(product, { length: profile.faceLength, lines: profile.faceLines });
  }
  const metal = preferredMetal(profile.temperature ?? null);
  if (metal && product.metal) score += product.metal === metal ? 1 : -1;
  return score;
}

/** Short reasons a product suits the profile, strongest first. */
export function styleFitReasons(
  product: RecommendationProduct,
  profile: RecommendationProfile,
): string[] {
  const reasons: string[] = [];
  if (profile.faceLength != null && profile.faceLines != null) {
    const face = { length: profile.faceLength, lines: profile.faceLines };
    const guide = faceGuidance(face);
    if (product.neckline && necklineFit(product.neckline as Neckline, face) > 0) {
      reasons.push(`${NECKLINE_LABELS[product.neckline as Neckline]} for your face`);
    }
    if (guide.pattern && product.pattern === guide.pattern) {
      reasons.push(guide.pattern === "floral" ? "Florals for your face" : "Geometric print for your face");
    }
    if (guide.drape && product.drape === guide.drape) {
      reasons.push(guide.drape === "fluid" ? "Fluid drape for your face" : "Crisp fabric for your face");
    }
  }
  const metal = preferredMetal(profile.temperature ?? null);
  if (metal && product.metal === metal) {
    reasons.push(metal === "gold" ? "Gold suits your colouring" : "Silver suits your colouring");
  }
  return reasons;
}

export function mondayUtc(date: Date): Date {
  const day = date.getUTCDay();
  const daysSinceMonday = (day + 6) % 7;
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate() - daysSinceMonday,
    ),
  );
}

export function selectWeeklyProducts({
  products,
  profile,
  excludedProductIds,
  userId,
  weekStart,
  count = 3,
}: {
  products: RecommendationProduct[];
  profile: RecommendationProfile;
  excludedProductIds: ReadonlySet<string>;
  userId: string;
  weekStart: Date;
  count?: number;
}): RecommendationProduct[] {
  // Best style fit first, then a per-user, per-week shuffle. Every pool below
  // keeps this order.
  const fit = new Map(products.map((product) => [product.id, styleFit(product, profile)]));
  const active = [...products].sort(
    (left, right) =>
      fit.get(right.id)! - fit.get(left.id)! ||
      stableHash(`${userId}:${weekStart.toISOString()}:${left.id}`) -
        stableHash(`${userId}:${weekStart.toISOString()}:${right.id}`) ||
      left.id.localeCompare(right.id),
  );
  const matchesShape = (product: RecommendationProduct) =>
    profile.bodyShape === null ||
    product.eligibleShapes.includes(profile.bodyShape);
  const exact = active.filter(
    (product) =>
      matchesShape(product) &&
      product.eligibleSeasons.includes(profile.colourSeason),
  );
  const targetFamily = isColourSeason(profile.colourSeason)
    ? getSeasonFamily(profile.colourSeason)
    : undefined;
  const family = active.filter(
    (product) =>
      targetFamily !== undefined &&
      matchesShape(product) &&
      !product.eligibleSeasons.includes(profile.colourSeason) &&
      hasSeasonFamily(product.eligibleSeasons, targetFamily),
  );
  const partial = active.filter((product) => {
    const shapeMatch = matchesShape(product);
    const seasonMatch = product.eligibleSeasons.includes(profile.colourSeason);
    if (!shapeMatch && !seasonMatch) return false;
    if (shapeMatch && seasonMatch) return false;
    if (
      targetFamily !== undefined &&
      shapeMatch &&
      hasSeasonFamily(product.eligibleSeasons, targetFamily)
    ) {
      return false;
    }
    return true;
  });
  const fresh = (pool: RecommendationProduct[]) =>
    pool.filter((product) => !excludedProductIds.has(product.id));

  const selected: RecommendationProduct[] = [];
  const selectedIds = new Set<string>();
  const selectedBrands = new Set<string>();
  const selectedTiers = new Set<string>();

  for (const pool of [
    fresh(exact),
    fresh(family),
    exact,
    family,
    fresh(partial),
    partial,
    fresh(active),
    active,
  ]) {
    addFromPool(pool, true);
    if (selected.length === count) return selected;
  }

  // A thin catalogue may not contain three brands. Product uniqueness remains
  // absolute; brand diversity relaxes only after history and eligibility.
  addFromPool(active, false);
  return selected;

  function addFromPool(pool: RecommendationProduct[], enforceBrand: boolean) {
    for (const preferNewTier of [true, false]) {
      for (const product of pool) {
        if (selected.length === count) return;
        if (selectedIds.has(product.id)) continue;
        if (enforceBrand && selectedBrands.has(normalizeBrand(product.brand))) {
          continue;
        }
        if (enforceBrand && isFinishing(product) && selected.some(isFinishing)) {
          continue;
        }
        if (preferNewTier && selectedTiers.has(product.priceTier)) continue;

        selected.push(product);
        selectedIds.add(product.id);
        selectedBrands.add(normalizeBrand(product.brand));
        selectedTiers.add(product.priceTier);
      }
    }
  }
}

export type SeasonFamily = "spring" | "summer" | "autumn" | "winter";

export function getSeasonFamily(season: ColourSeason): SeasonFamily {
  if (season.endsWith("_spring")) return "spring";
  if (season.endsWith("_summer")) return "summer";
  if (season.endsWith("_autumn")) return "autumn";
  if (season.endsWith("_winter")) return "winter";
  throw new Error(`Unsupported colour season: ${season}`);
}

function hasSeasonFamily(
  seasons: readonly string[],
  family: SeasonFamily,
): boolean {
  for (const season of seasons) {
    if (isColourSeason(season) && getSeasonFamily(season) === family) {
      return true;
    }
  }
  return false;
}

function normalizeBrand(brand: string) {
  return brand.trim().toLocaleLowerCase("en-GB");
}

function stableHash(value: string): number {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}
