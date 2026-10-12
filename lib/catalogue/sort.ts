export const catalogueSortKeys = ["name", "brand", "price"] as const;

export type CatalogueSortKey = (typeof catalogueSortKeys)[number];
export type CatalogueSortDirection = "asc" | "desc";

type SortableProduct = {
  title: string;
  brand: string;
  priceCents: number;
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
  if (key === "brand") {
    return collator.compare(left.brand, right.brand);
  }
  return collator.compare(left.title, right.title);
}
