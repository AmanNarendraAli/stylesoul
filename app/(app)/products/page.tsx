import Link from "next/link";
import { ProductCatalogue } from "@/components/catalogue/ProductCatalogue";
import { FirstEditViewTracker } from "@/components/recommendations/FirstEditViewTracker";
import { ProductCard } from "@/components/recommendations/ProductCard";
import { isBodyShape } from "@/lib/body-shape/classify";
import { isColourSeason } from "@/lib/colour-season/map";
import { AccountDeletedError } from "@/lib/server/account-lifecycle";
import { getAuthenticatedUserState } from "@/lib/server/auth";
import { styleFitReasons } from "@/lib/recommendations/select";
import { listActiveCatalogueProducts } from "@/lib/server/catalogue";
import { findStyleProfile } from "@/lib/server/profile";
import {
  getOrCreateWeeklyEditForUser,
  InsufficientCatalogueError,
  MissingStyleProfileError,
} from "@/lib/server/weekly-edit";

export default async function ProductsPage() {
  const [products, auth] = await Promise.all([
    listActiveCatalogueProducts(),
    getAuthenticatedUserState(),
  ]);
  const catalogue = products.map((product) => ({
    ...product,
    eligibleShapes: product.eligibleShapes.filter(isBodyShape),
    eligibleSeasons: product.eligibleSeasons.filter(isColourSeason),
  }));
  const profile = auth.user ? await findStyleProfile(auth.user.id) : null;
  let weeklyEdit: Awaited<
    ReturnType<typeof getOrCreateWeeklyEditForUser>
  > | null = null;
  let weeklyEditMessage: string | null = null;

  if (!auth.available) {
    weeklyEditMessage = "We couldn't reach authentication. Try again shortly.";
  } else if (!auth.user) {
    weeklyEditMessage = "Sign in to receive your weekly edit.";
  } else if (!profile) {
    weeklyEditMessage =
      "Complete your style profile to receive your weekly edit.";
  } else {
    try {
      weeklyEdit = await getOrCreateWeeklyEditForUser(auth.user.id);
    } catch (error) {
      if (error instanceof AccountDeletedError) {
        weeklyEditMessage = "Account deletion is in progress.";
      } else if (error instanceof InsufficientCatalogueError) {
        weeklyEditMessage =
          "We don't have enough pieces for your edit yet. Have a look through the catalogue below.";
      } else if (error instanceof MissingStyleProfileError) {
        weeklyEditMessage =
          "Complete your style profile to receive your weekly edit.";
      } else {
        throw error;
      }
    }
  }

  const shape =
    profile?.bodyShape && isBodyShape(profile.bodyShape)
      ? profile.bodyShape
      : null;
  const season =
    profile && isColourSeason(profile.colourSeason)
      ? profile.colourSeason
      : null;

  return (
    <main className="min-h-screen bg-charcoal px-4 py-10 text-cream sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <section aria-labelledby="weekly-edit-heading">
          {weeklyEdit ? <FirstEditViewTracker /> : null}
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs uppercase tracking-[0.24em] text-gold">
              {weeklyEdit
                ? `Week of ${new Intl.DateTimeFormat("en-GB", {
                    day: "numeric",
                    month: "long",
                    timeZone: "UTC",
                  }).format(weeklyEdit.weekStart)}`
                : "This week"}
            </p>
            {weeklyEdit ? (
              <span className="rounded-full border border-gold/40 px-2.5 py-0.5 text-xs text-cream/75">
                New edit Monday
              </span>
            ) : null}
          </div>
          <h1
            id="weekly-edit-heading"
            className="mt-3 font-display text-4xl sm:text-6xl"
          >
            This week&apos;s edit
          </h1>
          <p className="mt-4 max-w-2xl text-cream/70">
            Three pieces picked for your colours
            {shape ? " and shape" : ""}. A new edit arrives every Monday.
          </p>

          {weeklyEdit ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {weeklyEdit.items.map(({ product }) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  season={season}
                  reasons={profile ? styleFitReasons(product, profile) : []}
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-xl border border-cream/15 bg-cream/[0.03] p-6">
              <p className="text-sm text-cream/70">{weeklyEditMessage}</p>
              {auth.user && !profile ? (
                <Link
                  href="/onboarding"
                  className="mt-4 inline-flex min-h-11 items-center rounded bg-gold px-5 py-3 text-sm font-semibold text-charcoal transition hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  Start your style profile
                </Link>
              ) : null}
            </div>
          )}
        </section>

        <section
          className="mt-16 border-t border-cream/15 pt-12"
          aria-labelledby="catalogue-heading"
        >
          <p className="text-xs uppercase tracking-[0.24em] text-gold">
            Catalogue
          </p>
          <h2
            id="catalogue-heading"
            className="mt-3 font-display text-4xl sm:text-5xl"
          >
            Explore the catalogue
          </h2>
          <p className="mt-4 max-w-2xl text-cream/70">
            Everything we stock, with the colours and shapes each piece suits.
          </p>
          <ProductCatalogue products={catalogue} season={season} shape={shape} />
        </section>
      </div>
    </main>
  );
}
