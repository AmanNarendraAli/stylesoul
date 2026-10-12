import type { ColourSeason } from "@/lib/colour-season/map";
import { SEASON_PALETTES } from "@/components/avatar/palettes";
import { SEASON_LABELS } from "@/lib/labels";

export type RecommendationCardProduct = {
  id: string;
  brand: string;
  title: string;
  description: string | null;
  imageUrl: string;
  productUrl: string;
  priceCents: number;
  currency: string;
  garmentCategory: string;
  priceTier: string;
};

export function ProductCard({
  product,
  season,
}: {
  product: RecommendationCardProduct;
  season: ColourSeason | null;
}) {
  return (
    <article className="group overflow-hidden rounded-xl border border-cream/15 bg-cream/[0.03]">
      <div
        role="img"
        aria-label={product.title}
        className="aspect-[4/5] bg-cream/5 bg-cover bg-center"
        style={{ backgroundImage: `url(${JSON.stringify(product.imageUrl)})` }}
      />
      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-gold">
          {product.brand}
        </p>
        <h2 className="mt-2 font-display text-2xl">{product.title}</h2>
        {season ? (
          <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-cream/15 px-3 py-1 text-xs text-cream/80">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: SEASON_PALETTES[season].accent }}
            />
            Suits {SEASON_LABELS[season]}
          </p>
        ) : null}
        {product.description ? (
          <p className="mt-2 line-clamp-2 text-sm text-cream/65">
            {product.description}
          </p>
        ) : null}
        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="font-semibold">
              {new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: product.currency,
              }).format(product.priceCents / 100)}
            </p>
            <p className="mt-1 text-xs capitalize text-cream/60">
              {product.garmentCategory.replaceAll("_", " ")} · {product.priceTier}
            </p>
          </div>
          <a
            href={product.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded bg-gold px-4 py-2 text-sm font-semibold text-charcoal transition group-hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            View item
          </a>
        </div>
      </div>
    </article>
  );
}
