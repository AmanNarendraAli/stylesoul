"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Avatar } from "@/components/avatar/Avatar";
import {
  SEASON_LABELS,
  SEASON_PALETTES,
  SHAPE_LABELS,
} from "@/components/avatar/palettes";
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
  { value: "name", label: "Alphabetical" },
  { value: "brand", label: "Designer / provider" },
  { value: "silhouette", label: "Silhouette" },
  { value: "colour", label: "Colour season" },
  { value: "price", label: "Price" },
];

export function ProductCatalogue({ products }: { products: CatalogueProduct[] }) {
  const [sortKey, setSortKey] = useState<CatalogueSortKey>("name");
  const [direction, setDirection] = useState<CatalogueSortDirection>("asc");
  const sortedProducts = useMemo(
    () => sortCatalogueProducts(products, sortKey, direction),
    [direction, products, sortKey],
  );

  return (
    <>
      <div className="sticky top-0 z-20 mt-8 border-y border-cream/10 bg-charcoal/95 py-4 backdrop-blur">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <p className="pb-2 text-sm text-cream/60">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </p>
          <div className="flex items-end gap-2">
            <label className="text-xs uppercase tracking-[0.18em] text-cream/60">
              Sort by
              <select
                value={sortKey}
                onChange={(event) =>
                  setSortKey(event.target.value as CatalogueSortKey)
                }
                className="mt-2 block min-h-11 rounded-lg border border-cream/20 bg-charcoal px-3 py-2 text-sm normal-case tracking-normal text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
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
              aria-label={direction === "asc" ? "Sort descending" : "Sort ascending"}
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
        <ul className="mt-6 space-y-5" aria-label="Product catalogue">
          {sortedProducts.map((product) => (
            <li key={product.id}>
              <CatalogueProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-xl border border-cream/15 bg-cream/[0.03] p-8 text-center">
          <p className="font-display text-2xl">The catalogue is being curated</p>
          <p className="mt-2 text-sm text-cream/65">Check back soon for new pieces.</p>
        </div>
      )}
    </>
  );
}

function CatalogueProductCard({ product }: { product: CatalogueProduct }) {
  const iconSeason = product.eligibleSeasons[0] ?? "warm_spring";

  return (
    <article className="group overflow-hidden rounded-xl border border-cream/15 bg-cream/[0.03] sm:grid sm:grid-cols-[220px_minmax(0,1fr)]">
      <div
        className="relative aspect-[4/3] bg-cream/5 bg-cover bg-center sm:aspect-auto sm:min-h-64"
        style={{ backgroundImage: `url(${JSON.stringify(product.imageUrl)})` }}
        role="img"
        aria-label={product.title}
      >
        <div className="absolute bottom-3 right-3 flex -space-x-1 rounded-full border border-cream/20 bg-charcoal/90 px-2 py-1 shadow-xl backdrop-blur">
          {product.eligibleShapes.map((shape) => (
            <span key={shape} title={SHAPE_LABELS[shape]} className="block w-8 overflow-hidden">
              <Avatar shape={shape} season={iconSeason} size={28} pulse={false} />
            </span>
          ))}
        </div>
      </div>

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

          <dl className="mt-5 grid gap-4 text-sm lg:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-cream/45">
                Silhouettes
              </dt>
              <dd className="mt-1.5 text-cream/80">
                {product.eligibleShapes.map((shape) => SHAPE_LABELS[shape]).join(" · ")}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-cream/45">
                Colour seasons
              </dt>
              <dd className="mt-1.5 flex flex-wrap gap-2">
                {product.eligibleSeasons.map((season) => (
                  <span key={season} className="inline-flex items-center gap-1.5 text-cream/80">
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: SEASON_PALETTES[season].accent }}
                    />
                    {SEASON_LABELS[season]}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
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
