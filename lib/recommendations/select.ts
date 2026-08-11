import { colourSeasons, type ColourSeason } from "../colour-season/map.ts";

export type RecommendationProfile = {
  bodyShape: string;
  colourSeason: string;
};

export type RecommendationProduct = {
  id: string;
  brand: string;
  eligibleShapes: string[];
  eligibleSeasons: string[];
  priceTier: string;
};

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
  const active = [...products].sort(
    (left, right) =>
      stableHash(`${userId}:${weekStart.toISOString()}:${left.id}`) -
        stableHash(`${userId}:${weekStart.toISOString()}:${right.id}`) ||
      left.id.localeCompare(right.id),
  );
  const exact = active.filter(
    (product) =>
      product.eligibleShapes.includes(profile.bodyShape) &&
      product.eligibleSeasons.includes(profile.colourSeason),
  );
  const targetFamily = isColourSeason(profile.colourSeason)
    ? getSeasonFamily(profile.colourSeason)
    : undefined;
  const family = active.filter(
    (product) =>
      targetFamily !== undefined &&
      product.eligibleShapes.includes(profile.bodyShape) &&
      !product.eligibleSeasons.includes(profile.colourSeason) &&
      hasSeasonFamily(product.eligibleSeasons, targetFamily),
  );
  const partial = active.filter((product) => {
    const shapeMatch = product.eligibleShapes.includes(profile.bodyShape);
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

function isColourSeason(value: string): value is ColourSeason {
  return (colourSeasons as readonly string[]).includes(value);
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
