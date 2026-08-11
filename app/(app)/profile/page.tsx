import Link from "next/link";
import { redirect } from "next/navigation";
import { Avatar } from "@/components/avatar/Avatar";
import {
  SEASON_LABELS,
  SEASON_PALETTES,
  SHAPE_LABELS,
} from "@/components/avatar/palettes";
import { bodyShapes, type BodyShape } from "@/lib/body-shape/classify";
import { colourSeasons, type ColourSeason } from "@/lib/colour-season/map";
import {
  eyeOptions,
  hairOptions,
  skinOptions,
  undertoneOptions,
} from "@/lib/colour-season/options";
import { findStyleProfile } from "@/lib/server/profile";
import { colourGuidance, shapeGuidance } from "@/lib/style-guidance/guidance";
import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  const profile = await findStyleProfile(user.id);

  if (!profile) {
    redirect("/onboarding");
  }

  const measurements: Array<[string, string]> = [
    ["Height", `${profile.heightCm} cm`],
    profile.weightKg ? ["Weight", `${profile.weightKg} kg`] : null,
    ["Bust", `${profile.bustCm} cm`],
    ["Waist", `${profile.waistCm} cm`],
    ["Hips", `${profile.hipsCm} cm`],
    ["Shoulder width", `${profile.shouldersCm} cm`],
  ].filter(Boolean) as Array<[string, string]>;
  const colouring: Array<[string, string]> = [
    ["Skin tone", optionLabel(skinOptions, profile.skinTone)],
    ["Undertone", optionLabel(undertoneOptions, profile.undertone)],
    ["Eye colour", optionLabel(eyeOptions, profile.eyeColour)],
    ["Hair colour", optionLabel(hairOptions, profile.hairColour)],
  ];

  const isKnownShape = (bodyShapes as readonly string[]).includes(
    profile.bodyShape,
  );
  const isKnownSeason = (colourSeasons as readonly string[]).includes(
    profile.colourSeason,
  );
  const hasSeasonDimensions = Boolean(
    profile.temperature && profile.value && profile.chroma && profile.contrast,
  );

  if (!isKnownShape || !isKnownSeason || !hasSeasonDimensions) {
    return (
      <main className="min-h-screen bg-charcoal px-6 py-16 text-cream">
        <section className="mx-auto max-w-5xl">
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Profile</p>
          <h1 className="mt-3 break-words font-display text-4xl sm:text-5xl">
            {user.email}
          </h1>

          <div className="mt-12 rounded-lg border border-cream/15 bg-cream/[0.03] p-6 sm:p-10">
            <h2 className="font-display text-3xl">Reanalysis needed</h2>
            <p className="mt-3 max-w-2xl text-sm text-cream/65">
              {!hasSeasonDimensions
                ? "Your saved profile predates our 12-season analysis based on colour comparisons and our current measurement method, so we won’t assign it a new palette or silhouette without your input. Re-run the analysis to rebuild your style guide."
                : "Your saved style result uses a format this version no longer recognises, so we won’t guess a palette or silhouette for you. Re-run the analysis to rebuild your style guide from your confirmed details."}
            </p>
            <Link
              href="/onboarding/body"
              className="mt-6 inline-flex min-h-11 items-center rounded bg-gold px-5 py-3 text-sm font-semibold text-charcoal transition hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Re-run analysis
            </Link>
          </div>

          <div className="mt-14 space-y-10">
            <ProfileFacts measurements={measurements} colouring={colouring} />
          </div>
        </section>
      </main>
    );
  }

  const shape = profile.bodyShape as BodyShape;
  const season = profile.colourSeason as ColourSeason;
  const palette = SEASON_PALETTES[season];
  const colourGuide = colourGuidance[season];
  const shapeGuide = shapeGuidance[shape];

  const colourCategories = [
    ["Colours to wear", colourGuide.coloursToWear],
    ["Accent colours", colourGuide.accentColours],
    ["Colours to avoid", colourGuide.coloursToAvoid],
  ] as const;
  const shapeCategories = [
    ["Shapes to wear", shapeGuide.shapesToWear],
    ["Accent shapes and details", shapeGuide.accentShapesAndDetails],
    ["Shapes to avoid", shapeGuide.shapesToAvoid],
  ] as const;

  return (
    <main className="min-h-screen bg-charcoal px-6 py-16 text-cream">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.24em] text-gold">Profile</p>
        <h1 className="mt-3 break-words font-display text-4xl sm:text-5xl">
          {user.email}
        </h1>

        <div className="mt-12 grid gap-10 md:grid-cols-[260px_minmax(0,1fr)]">
          <div className="flex justify-center md:justify-start">
            <Avatar shape={shape} season={season} size={240} />
          </div>

          <div className="space-y-10">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cream/60">
                Your silhouette today
              </p>
              <p className="mt-2 font-display text-3xl">{SHAPE_LABELS[shape]}</p>
              <p className="mt-2 max-w-md text-sm text-cream/65">
                Based on your current measurements — styling guidance, not a
                verdict.
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cream/60">
                Colour season
              </p>
              <p className="mt-2 font-display text-3xl">{SEASON_LABELS[season]}</p>
              <div className="mt-3 flex gap-2">
                {(Object.entries(palette) as Array<[string, string]>)
                  .filter(([key]) => key !== "pulse")
                  .map(([key, hex]) => (
                    <span
                      key={key}
                      title={`${key} ${hex}`}
                      className="h-6 w-6 rounded-full border border-cream/15"
                      style={{ backgroundColor: hex }}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>

        <section
          aria-labelledby="style-guide-heading"
          className="mt-14 rounded-lg border border-gold/25 bg-cream/[0.03] p-6 sm:p-10"
        >
          <p className="text-xs uppercase tracking-[0.24em] text-gold">
            {SEASON_LABELS[season]} · {SHAPE_LABELS[shape]}
          </p>
          <h2 id="style-guide-heading" className="mt-2 font-display text-3xl sm:text-4xl">
            Your style guide
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-cream/65">
            Seasonal palettes and silhouette categories are practitioner styling
            conventions, not scientifically validated classes — read every
            &ldquo;avoid&rdquo; as an optional lever, never a rule.
          </p>


          <div className="mt-10 space-y-12">
            <div>
              <h3 className="font-display text-2xl">Your colour guide</h3>
              <p className="mt-2 max-w-2xl text-sm text-cream/65">
                {colourGuide.meaning}
              </p>

              <div className="mt-6 space-y-8">
                {colourCategories.map(([title, category]) => (
                  <div key={title}>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                      <h4 className="shrink-0 font-display text-xl">{title}</h4>
                      <p className="text-sm text-cream/65">{category.explainer}</p>
                    </div>
                    <p className="mt-2 max-w-2xl text-sm text-cream/50">
                      {category.rationale}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-3">
                      {category.swatches.map((colourSwatch) => (
                        <li
                          key={colourSwatch.name}
                          className="flex w-16 flex-col items-center gap-1.5 text-center"
                        >
                          <span
                            aria-hidden
                            className="h-10 w-10 rounded-full border border-cream/15"
                            style={{ backgroundColor: colourSwatch.hex }}
                          />
                          <span className="text-[11px] leading-tight text-cream/70">
                            {colourSwatch.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xl">Your shape guide</h3>
              <p className="mt-2 max-w-2xl text-sm text-cream/65">
                {shapeGuide.meaning}
              </p>

              <div className="mt-6 space-y-8">
                {shapeCategories.map(([title, category]) => (
                  <div key={title}>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                      <h4 className="shrink-0 font-display text-xl">{title}</h4>
                      <p className="text-sm text-cream/65">{category.explainer}</p>
                    </div>
                    <p className="mt-2 max-w-2xl text-sm text-cream/50">
                      {category.rationale}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {category.examples.map((example) => (
                        <li
                          key={example}
                          className="rounded-full border border-cream/15 bg-cream/[0.04] px-3 py-1 text-sm text-cream/80"
                        >
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-14 space-y-10">
          <ProfileFacts measurements={measurements} colouring={colouring} />

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/products"
              className="inline-flex min-h-11 items-center rounded bg-gold px-5 py-3 text-sm font-semibold text-charcoal transition hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Shop your edit
            </Link>
            <Link
              href="/onboarding/body"
              className="inline-flex min-h-11 items-center rounded border border-cream/25 px-5 py-3 text-sm transition hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Re-run analysis
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProfileFacts({
  measurements,
  colouring,
}: {
  measurements: Array<[string, string]>;
  colouring: Array<[string, string]>;
}) {
  return (
    <>
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-cream/60">
          Measurements
        </p>
        <dl className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          {measurements.map(([label, value]) => (
            <div key={label} className="rounded border border-cream/10 bg-cream/[0.03] px-3 py-2">
              <dt className="text-cream/50">{label}</dt>
              <dd className="mt-1 font-semibold text-cream">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-cream/60">
          Colouring
        </p>
        <dl className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          {colouring.map(([label, value]) => (
            <div key={label} className="rounded border border-cream/10 bg-cream/[0.03] px-3 py-2">
              <dt className="text-cream/50">{label}</dt>
              <dd className="mt-1 font-semibold text-cream">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}

function optionLabel<T extends string>(
  options: Array<{ value: T; label: string }>,
  value: string,
) {
  return options.find((option) => option.value === value)?.label ?? value;
}
