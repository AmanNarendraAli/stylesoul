import { SEASON_LABELS, SHAPE_LABELS } from "@/components/avatar/palettes";

export const catalogueSortKeys = [
  "name",
  "brand",
  "silhouette",
  "colour",
  "price",
] as const;

export type CatalogueSortKey = (typeof catalogueSortKeys)[number];
export type CatalogueSortDirection = "asc" | "desc";

type SortableProduct = {
  title: string;
  brand: string;
  priceCents: number;
  eligibleShapes: Array<keyof typeof SHAPE_LABELS>;
  eligibleSeasons: Array<keyof typeof SEASON_LABELS>;
};

const collator = new Intl.Collator("en-GB", {
  numeric: true,
  sensitivity: "base",
});

export function sortCatalogueProducts<T extends SortableProduct>(
  products: readonly T[],
  key: CatalogueSortKey,
  direction: CatalogueSortDirection,
): T[] {
  const sign = direction === "asc" ? 1 : -1;

  return [...products].sort((left, right) => {
    const comparison = compareProduct(left, right, key);
    return comparison === 0
      ? collator.compare(left.title, right.title) * sign
      : comparison * sign;
  });
}

function compareProduct(
  left: SortableProduct,
  right: SortableProduct,
  key: CatalogueSortKey,
) {
  if (key === "price") {
    return left.priceCents - right.priceCents;
  }

  return collator.compare(sortValue(left, key), sortValue(right, key));
}

function sortValue(product: SortableProduct, key: Exclude<CatalogueSortKey, "price">) {
  if (key === "name") return product.title;
  if (key === "brand") return product.brand;
  if (key === "silhouette") {
    return product.eligibleShapes
      .map((shape) => SHAPE_LABELS[shape])
      .sort(collator.compare)
      .join(", ");
  }
  return product.eligibleSeasons
    .map((season) => SEASON_LABELS[season])
    .sort(collator.compare)
    .join(", ");
}
