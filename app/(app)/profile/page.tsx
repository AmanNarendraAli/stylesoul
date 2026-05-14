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
import { prisma } from "@/lib/db/prisma";
import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  const profile = await prisma.styleProfile.findUnique({
    where: { userId: user.id },
  });

  if (!profile) {
    redirect("/onboarding");
  }

  const shape = (bodyShapes as readonly string[]).includes(profile.bodyShape)
    ? (profile.bodyShape as BodyShape)
    : "rectangle";
  const season = (colourSeasons as readonly string[]).includes(profile.colourSeason)
    ? (profile.colourSeason as ColourSeason)
    : "warm_spring";
  const palette = SEASON_PALETTES[season];

  const measurements: Array<[string, string]> = [
    ["Height", `${profile.heightCm} cm`],
    profile.weightKg ? ["Weight", `${profile.weightKg} kg`] : null,
    ["Bust", `${profile.bustCm} cm`],
    ["Waist", `${profile.waistCm} cm`],
    ["Hips", `${profile.hipsCm} cm`],
    ["Shoulders", `${profile.shouldersCm} cm`],
  ].filter(Boolean) as Array<[string, string]>;

  return (
    <main className="min-h-screen bg-charcoal px-6 py-16 text-cream">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.24em] text-gold">Profile</p>
        <h1 className="mt-3 font-display text-5xl">{user.email}</h1>

        <div className="mt-12 grid gap-10 md:grid-cols-[260px_minmax(0,1fr)]">
          <div className="flex justify-center md:justify-start">
            <Avatar shape={shape} season={season} size={240} />
          </div>

          <div className="space-y-10">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cream/60">
                Silhouette
              </p>
              <p className="mt-2 font-display text-3xl">{SHAPE_LABELS[shape]}</p>
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

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/edit"
                className="rounded bg-gold px-5 py-3 text-sm font-semibold text-charcoal transition hover:bg-cream"
              >
                See this week&apos;s edit
              </Link>
              <Link
                href="/onboarding/body"
                className="rounded border border-cream/25 px-5 py-3 text-sm transition hover:border-gold hover:text-gold"
              >
                Re-run analysis
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
