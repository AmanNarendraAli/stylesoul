import { ProductCatalogue } from "@/components/catalogue/ProductCatalogue";
import { FirstEditViewTracker } from "@/components/recommendations/FirstEditViewTracker";
import { ProductCard } from "@/components/recommendations/ProductCard";
import { bodyShapes, type BodyShape } from "@/lib/body-shape/classify";
import { colourSeasons, type ColourSeason } from "@/lib/colour-season/map";
import { AccountDeletedError } from "@/lib/server/account-lifecycle";
import { getAuthenticatedUserState } from "@/lib/server/auth";
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
      } else if (
        error instanceof InsufficientCatalogueError ||
        error instanceof MissingStyleProfileError
      ) {
        weeklyEditMessage = "Your edit is being curated. Check back shortly.";
      } else {
        throw error;
      }
    }
  }

  const shape =
    profile && (bodyShapes as readonly string[]).includes(profile.bodyShape)
      ? (profile.bodyShape as BodyShape)
      : "rectangle";
  const season =
    profile &&
    (colourSeasons as readonly string[]).includes(profile.colourSeason)
      ? (profile.colourSeason as ColourSeason)
      : "warm_spring";

  return (
    <main className="min-h-screen bg-charcoal px-4 py-10 text-cream sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <section aria-labelledby="weekly-edit-heading">
          {weeklyEdit ? <FirstEditViewTracker /> : null}
          <p className="text-xs uppercase tracking-[0.24em] text-gold">
            {weeklyEdit
              ? `Week of ${new Intl.DateTimeFormat("en-GB", {
                  day: "numeric",
                  month: "long",
                  timeZone: "UTC",
                }).format(weeklyEdit.weekStart)}`
              : "Home"}
          </p>
          <h1
            id="weekly-edit-heading"
            className="mt-3 font-display text-4xl sm:text-6xl"
          >
            This week&apos;s edit
          </h1>
          <p className="mt-4 max-w-2xl text-cream/70">
            Three pieces selected for your silhouette and colour season. Your
            edit stays the same all week.
          </p>

          {weeklyEdit ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {weeklyEdit.items.map(({ product }) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  shape={shape}
                  season={season}
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-xl border border-cream/15 bg-cream/[0.03] p-6">
              <p className="text-sm text-cream/70">{weeklyEditMessage}</p>
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
            Browse every active piece, with its recommended silhouettes and
            colour seasons visible at a glance.
          </p>
          <ProductCatalogue products={catalogue} />
        </section>
      </div>
    </main>
  );
}

function isBodyShape(value: string): value is BodyShape {
  return (bodyShapes as readonly string[]).includes(value);
}

function isColourSeason(value: string): value is ColourSeason {
  return (colourSeasons as readonly string[]).includes(value);
}
