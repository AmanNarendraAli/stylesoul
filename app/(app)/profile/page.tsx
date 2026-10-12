import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Avatar } from "@/components/avatar/Avatar";
import { isBodyShape, type BodyShape } from "@/lib/body-shape/classify";
import {
  isColourSeason,
  type ColourSeason,
  type EyeColour,
  type HairColour,
  type SkinTone,
  type Undertone,
} from "@/lib/colour-season/map";
import { ColourSpectrums } from "@/components/profile/ColourSpectrums";
import {
  eyeOptions,
  hairOptions,
  skinOptions,
  undertoneOptions,
  type ColourOption,
} from "@/lib/colour-season/options";
import { signInPath } from "@/lib/auth-redirect";
import { formatLength, parseUnit, UNIT_COOKIE } from "@/lib/units";
import { SEASON_LABELS, SHAPE_LABELS } from "@/lib/labels";
import { findStyleProfile } from "@/lib/server/profile";
import {
  colourGuidance,
  shapeGuidance,
  type GuidanceSwatch,
} from "@/lib/style-guidance/guidance";
import { createClient } from "@/lib/supabase/server";

const primaryLink =
  "inline-flex min-h-11 items-center rounded bg-gold px-5 py-3 text-sm font-semibold text-charcoal transition hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold";
const secondaryLink =
  "inline-flex min-h-11 items-center rounded border border-cream/25 px-5 py-3 text-sm transition hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold";

const EDIT_COLOURS_HREF = "/onboarding/colouring?edit=1";
const EDIT_MEASUREMENTS_HREF = "/onboarding/body?edit=1";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(signInPath("/profile"));
  }

  const profile = await findStyleProfile(user.id);

  if (!profile) {
    redirect("/onboarding");
  }

  const unit = parseUnit((await cookies()).get(UNIT_COOKIE)?.value);
  const measurements: Array<[string, string]> = [
    profile.heightCm ? ["Height", formatLength(profile.heightCm, unit, "height")] : null,
    profile.weightKg ? ["Weight", `${profile.weightKg} kg`] : null,
    profile.bustCm ? ["Bust", formatLength(profile.bustCm, unit)] : null,
    profile.waistCm ? ["Waist", formatLength(profile.waistCm, unit)] : null,
    profile.hipsCm ? ["Hips", formatLength(profile.hipsCm, unit)] : null,
    profile.shouldersCm
      ? ["Shoulder width", formatLength(profile.shouldersCm, unit)]
      : null,
  ].filter(Boolean) as Array<[string, string]>;
  const skinHex = findOption(skinOptions, profile.skinTone)?.hex;
  const colouring: Array<[string, string, string | undefined]> = [
    colourFact("Skin tone", skinOptions, profile.skinTone),
    colourFact("Undertone", undertoneOptions, profile.undertone),
    colourFact("Eye colour", eyeOptions, profile.eyeColour),
    colourFact("Hair colour", hairOptions, profile.hairColour),
  ];
  const hasMeasurements = profile.bodyShape !== null;

  // No body shape is valid (measurements skipped); an unrecognised one is not.
  const isKnownShape =
    profile.bodyShape === null || isBodyShape(profile.bodyShape);
  const isKnownSeason = isColourSeason(profile.colourSeason);
  const hasSeasonDimensions = Boolean(
    profile.temperature && profile.value && profile.chroma && profile.contrast,
  );

  if (!isKnownShape || !isKnownSeason || !hasSeasonDimensions) {
    return (
      <main className="min-h-screen bg-charcoal px-6 py-16 text-cream">
        <section className="mx-auto max-w-5xl">
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Profile</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">
            Your style profile
          </h1>

          <div className="mt-12 rounded-lg border border-cream/15 bg-cream/[0.03] p-6 sm:p-10">
            <h2 className="font-display text-3xl">Update your profile</h2>
            <p className="mt-3 max-w-2xl text-sm text-cream/65">
              We&apos;ve improved how we work out your colours and shape. Run it
              again to see your new guide. Your answers are already filled in.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={EDIT_COLOURS_HREF} className={primaryLink}>
                Edit colours
              </Link>
              <Link href={EDIT_MEASUREMENTS_HREF} className={secondaryLink}>
                {hasMeasurements ? "Edit measurements" : "Add measurements"}
              </Link>
            </div>
          </div>

          <div className="mt-14 space-y-10">
            <ProfileFacts measurements={measurements} colouring={colouring} />
          </div>
        </section>
      </main>
    );
  }

  const shape = profile.bodyShape as BodyShape | null;
  const season = profile.colourSeason as ColourSeason;
  const colourGuide = colourGuidance[season];
  const shapeGuide = shape ? shapeGuidance[shape] : null;

  const colourCategories = [
    ["Colours to wear", colourGuide.coloursToWear, false],
    ["Accent colours", colourGuide.accentColours, false],
    ["Wear away from your face", colourGuide.coloursToAvoid, true],
  ] as const;
  const shapeCategories = shapeGuide
    ? ([
        ["Shapes to wear", shapeGuide.shapesToWear],
        ["Accent shapes and details", shapeGuide.accentShapesAndDetails],
        ["Go easy on", shapeGuide.shapesToAvoid],
      ] as const)
    : [];
  const shapeNumbers = measurements.filter(([label]) =>
    ["Bust", "Waist", "Hips"].includes(label),
  );

  return (
    <main className="min-h-screen bg-charcoal px-6 py-16 text-cream">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.24em] text-gold">Profile</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">
          Your style profile
        </h1>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cream/60">
              Your colour season
            </p>
            <p className="mt-2 font-display text-4xl">{SEASON_LABELS[season]}</p>
          </div>
          <Link href="/products" className={primaryLink}>
            See this week&apos;s three pieces
          </Link>
        </div>
        <p className="mt-4 text-sm text-cream/60">
          Colour seasons and body shapes are stylists&apos; rules of thumb.
          Treat them as suggestions.
        </p>

        <section
          aria-labelledby="colour-guide-heading"
          className="mt-12 rounded-lg border border-gold/25 bg-cream/[0.03] p-6 sm:p-10"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 id="colour-guide-heading" className="font-display text-3xl">
              Your colour guide
            </h2>
            <Link href={EDIT_COLOURS_HREF} className={secondaryLink}>
              Edit colours
            </Link>
          </div>

          <ColourSpectrums
            colouring={{
              skinTone: profile.skinTone as SkinTone,
              undertone: profile.undertone as Undertone,
              eyeColour: profile.eyeColour as EyeColour,
              hairColour: profile.hairColour as HairColour,
            }}
            skinHex={skinHex ?? "#C8BEB3"}
          />

          <div className="mt-10 space-y-8">
            {colourCategories.map(([title, category, isAvoid]) => (
              <div key={title}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                  <h3 className="shrink-0 font-display text-xl">{title}</h3>
                  <p className="text-sm text-cream/65">{category.explainer}</p>
                </div>
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-3">
                  {category.swatches.map((colourSwatch) => (
                    <Swatch
                      key={colourSwatch.name}
                      swatch={colourSwatch}
                      skinHex={isAvoid ? undefined : skinHex}
                      muted={isAvoid}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {shape && shapeGuide ? (
          <section
            aria-labelledby="shape-guide-heading"
            className="mt-10 rounded-lg border border-cream/15 bg-cream/[0.03] p-6 sm:p-10"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 id="shape-guide-heading" className="font-display text-3xl">
                Your shape guide
              </h2>
              <Link href={EDIT_MEASUREMENTS_HREF} className={secondaryLink}>
                Edit measurements
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-6">
              <Avatar shape={shape} season={season} size={110} pulse={false} />
              <div>
                <p className="font-display text-2xl">{SHAPE_LABELS[shape]}</p>
                <dl className="mt-3 space-y-1 text-sm">
                  {shapeNumbers.map(([label, value]) => (
                    <div key={label} className="flex gap-3">
                      <dt className="w-12 text-cream/50">{label}</dt>
                      <dd className="font-semibold">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="mt-10 space-y-8">
              {shapeCategories.map(([title, category]) => (
                <div key={title}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                    <h3 className="shrink-0 font-display text-xl">{title}</h3>
                    <p className="text-sm text-cream/65">{category.explainer}</p>
                  </div>
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
          </section>
        ) : (
          <section className="mt-10 rounded-lg border border-cream/15 bg-cream/[0.03] p-6">
            <h2 className="font-display text-2xl">Add your measurements</h2>
            <p className="mt-2 max-w-2xl text-sm text-cream/65">
              Your guide uses your colouring for now. Add a few measurements and
              we&apos;ll show you which cuts suit you and use them in your weekly
              picks.
            </p>
            <Link href={EDIT_MEASUREMENTS_HREF} className={`mt-4 ${secondaryLink}`}>
              Add measurements
            </Link>
          </section>
        )}

        <div className="mt-14 space-y-10">
          <ProfileFacts measurements={measurements} colouring={colouring} />
        </div>
      </section>
    </main>
  );
}

function Swatch({
  swatch,
  skinHex,
  muted,
}: {
  swatch: GuidanceSwatch;
  skinHex?: string;
  muted: boolean;
}) {
  return (
    <li className="flex w-16 flex-col items-center gap-1.5 text-center">
      <span
        aria-hidden="true"
        className={`relative flex h-12 w-12 items-center justify-center rounded-full border ${
          muted ? "border-dashed border-cream/50 opacity-55" : "border-cream/15"
        }`}
        style={{ backgroundColor: swatch.hex }}
      >
        {skinHex ? (
          <span
            className="h-5 w-5 rounded-full border border-charcoal/20"
            style={{ backgroundColor: skinHex }}
          />
        ) : null}
      </span>
      <span className="text-[11px] leading-tight text-cream/70">{swatch.name}</span>
    </li>
  );
}

function ProfileFacts({
  measurements,
  colouring,
}: {
  measurements: Array<[string, string]>;
  colouring: Array<[string, string, string | undefined]>;
}) {
  return (
    <>
      {measurements.length > 0 ? (
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
      ) : null}

      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-cream/60">
          Colouring
        </p>
        <dl className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          {colouring.map(([label, value, hex]) => (
            <div key={label} className="rounded border border-cream/10 bg-cream/[0.03] px-3 py-2">
              <dt className="text-cream/50">{label}</dt>
              <dd className="mt-1 flex items-center gap-2 font-semibold text-cream">
                {hex ? (
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 rounded-full border border-cream/20"
                    style={{ backgroundColor: hex }}
                  />
                ) : null}
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}

function findOption<T extends string>(options: ColourOption<T>[], value: string) {
  return options.find((option) => option.value === value);
}

function colourFact<T extends string>(
  label: string,
  options: ColourOption<T>[],
  value: string,
): [string, string, string | undefined] {
  const option = findOption(options, value);
  return [label, option?.label ?? value, option?.hex];
}

function capitalise(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
