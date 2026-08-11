import type { BodyShape } from "@/lib/body-shape/classify";
import type { ColourSeason } from "@/lib/colour-season/map";
import { Avatar } from "@/components/avatar/Avatar";

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
  shape,
  season,
}: {
  product: RecommendationCardProduct;
  shape: BodyShape;
  season: ColourSeason;
}) {
  return (
    <article className="group overflow-hidden rounded-xl border border-cream/15 bg-cream/[0.03]">
      <div
        aria-hidden="true"
        className="relative aspect-[4/5] bg-cream/5 bg-cover bg-center"
        style={{ backgroundImage: `url(${JSON.stringify(product.imageUrl)})` }}
      >
        <div className="absolute bottom-3 right-3 rounded-full border border-cream/20 bg-charcoal/85 p-2 shadow-xl backdrop-blur">
          <Avatar shape={shape} season={season} size={82} />
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-gold">
          {product.brand}
        </p>
        <h2 className="mt-2 font-display text-2xl">{product.title}</h2>
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
