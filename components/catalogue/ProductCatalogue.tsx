"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import type { BodyShape } from "@/lib/body-shape/classify";
import type { ColourSeason } from "@/lib/colour-season/map";
import {
  sortCatalogueProducts,
  type CatalogueSortDirection,
  type CatalogueSortKey,
} from "@/lib/catalogue/sort";

export type CatalogueProduct = {
  id: string;
  brand: string;
  title: string;
  description: string | null;
  imageUrl: string;
  productUrl: string;
  priceCents: number;
  currency: string;
  eligibleShapes: BodyShape[];
  eligibleSeasons: ColourSeason[];
  garmentCategory: string;
  priceTier: string;
};

const sortOptions: Array<{ value: CatalogueSortKey; label: string }> = [
  { value: "name", label: "A–Z" },
  { value: "brand", label: "Brand" },
  { value: "price", label: "Price" },
];

const PAGE_SIZE = 24;
const ALL_CATEGORIES = "all";

const selectClass =
  "mt-2 block min-h-11 rounded-lg border border-cream/20 bg-charcoal px-3 py-2 text-sm normal-case tracking-normal text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold";

export function ProductCatalogue({
  products,
  season = null,
  shape = null,
}: {
  products: CatalogueProduct[];
  season?: ColourSeason | null;
  shape?: BodyShape | null;
}) {
  const [sortKey, setSortKey] = useState<CatalogueSortKey>("name");
  const [direction, setDirection] = useState<CatalogueSortDirection>("asc");
  const [onlySuitsMe, setOnlySuitsMe] = useState(season !== null);
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const categories = useMemo(
    () => [...new Set(products.map((product) => product.garmentCategory))].sort(),
    [products],
  );
  const sortedProducts = useMemo(
    () =>
      sortCatalogueProducts(
        products.filter(
          (product) =>
            (category === ALL_CATEGORIES || product.garmentCategory === category) &&
            (!onlySuitsMe || suits(product, season, shape)),
        ),
        sortKey,
        direction,
      ),
    [category, direction, onlySuitsMe, products, season, shape, sortKey],
  );
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  return (
    <>
      <div className="z-20 mt-8 border-y border-cream/10 bg-charcoal/95 py-4 backdrop-blur sm:sticky sm:top-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pb-2 text-sm text-cream/60">
            <p>
              {sortedProducts.length}{" "}
              {sortedProducts.length === 1 ? "piece" : "pieces"}
            </p>
            {season ? (
              <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-cream">
                <input
                  type="checkbox"
                  checked={onlySuitsMe}
                  onChange={(event) => setOnlySuitsMe(event.target.checked)}
                  className="h-4 w-4 accent-gold"
                />
                Only pieces that suit me
              </label>
            ) : null}
          </div>
          <div className="flex flex-wrap items-end gap-2">
            <label className="text-xs uppercase tracking-[0.18em] text-cream/60">
              Category
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className={selectClass}
              >
                <option value={ALL_CATEGORIES}>All</option>
                {categories.map((value) => (
                  <option key={value} value={value}>
                    {categoryLabel(value)}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs uppercase tracking-[0.18em] text-cream/60">
              Sort by
              <select
                value={sortKey}
                onChange={(event) =>
                  setSortKey(event.target.value as CatalogueSortKey)
                }
                className={selectClass}
                aria-label="Sort products by"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={() =>
                setDirection((current) => (current === "asc" ? "desc" : "asc"))
              }
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-cream/20 px-3 py-2 text-sm text-cream transition hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label={
                direction === "asc"
                  ? "Ascending, switch to descending"
                  : "Descending, switch to ascending"
              }
              title={direction === "asc" ? "Ascending" : "Descending"}
            >
              {direction === "asc" ? (
                <ArrowUp aria-hidden="true" size={18} />
              ) : (
                <ArrowDown aria-hidden="true" size={18} />
              )}
              <span className="hidden sm:inline">
                {direction === "asc" ? "Ascending" : "Descending"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <>
          <ul className="mt-6 space-y-5" aria-label="Product catalogue">
            {sortedProducts.slice(0, visibleCount).map((product) => (
              <li key={product.id}>
                <CatalogueProductCard
                  product={product}
                  suitsColours={season !== null && product.eligibleSeasons.includes(season)}
                  suitsShape={shape !== null && product.eligibleShapes.includes(shape)}
                />
              </li>
            ))}
          </ul>
          {visibleCount < sortedProducts.length ? (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                className="inline-flex min-h-11 items-center rounded-lg border border-cream/20 px-5 py-2 text-sm text-cream transition hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Show more
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <div className="mt-8 rounded-xl border border-cream/15 bg-cream/[0.03] p-8 text-center">
          <p className="font-display text-2xl">Nothing here yet</p>
          {products.length > 0 ? (
            <p className="mt-2 text-sm text-cream/65">
              Try another category or show all pieces.
            </p>
          ) : null}
        </div>
      )}
    </>
  );
}

function suits(
  product: CatalogueProduct,
  season: ColourSeason | null,
  shape: BodyShape | null,
) {
  return (
    (season === null || product.eligibleSeasons.includes(season)) &&
    (shape === null || product.eligibleShapes.includes(shape))
  );
}

function categoryLabel(value: string) {
  const label = value.replaceAll("_", " ");
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function CatalogueProductCard({
  product,
  suitsColours,
  suitsShape,
}: {
  product: CatalogueProduct;
  suitsColours: boolean;
  suitsShape: boolean;
}) {
  return (
    <article className="group overflow-hidden rounded-xl border border-cream/15 bg-cream/[0.03] sm:grid sm:grid-cols-[220px_minmax(0,1fr)]">
      <div
        className="aspect-[4/3] bg-cream/5 bg-cover bg-center sm:aspect-auto sm:min-h-64"
        style={{ backgroundImage: `url(${JSON.stringify(product.imageUrl)})` }}
        role="img"
        aria-label={product.title}
      />

      <div className="flex min-w-0 flex-col justify-between p-5 sm:p-6">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.2em] text-gold">
                {product.brand}
              </p>
              <h3 className="mt-2 break-words font-display text-2xl sm:text-3xl">
                {product.title}
              </h3>
            </div>
            <p className="shrink-0 text-lg font-semibold">
              {new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: product.currency,
              }).format(product.priceCents / 100)}
            </p>
          </div>

          {product.description ? (
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-cream/65">
              {product.description}
            </p>
          ) : null}

          {suitsColours || suitsShape ? (
            <ul className="mt-4 flex flex-wrap gap-2 text-xs text-cream/80">
              {suitsColours ? (
                <li className="rounded-full border border-gold/40 px-3 py-1">
                  Suits your colours
                </li>
              ) : null}
              {suitsShape ? (
                <li className="rounded-full border border-gold/40 px-3 py-1">
                  Suits your shape
                </li>
              ) : null}
            </ul>
          ) : null}
        </div>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-cream/10 pt-4">
          <p className="text-xs capitalize text-cream/55">
            {product.garmentCategory.replaceAll("_", " ")} · {product.priceTier}
          </p>
          <a
            href={product.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded bg-gold px-4 py-2 text-sm font-semibold text-charcoal transition hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            View item
          </a>
        </div>
      </div>
    </article>
  );
}
