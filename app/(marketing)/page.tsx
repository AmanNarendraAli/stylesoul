import Link from "next/link";
import { redirect } from "next/navigation";
import { Camera, Ruler, Shirt } from "lucide-react";
import { Avatar } from "@/components/avatar/Avatar";
import { SEASON_LABELS, SHAPE_LABELS } from "@/lib/labels";
import { getAuthenticatedUserState } from "@/lib/server/auth";
import { colourGuidance } from "@/lib/style-guidance/guidance";

const steps = [
  { Icon: Camera, label: "Take a photo" },
  { Icon: Ruler, label: "Add measurements (optional)" },
  { Icon: Shirt, label: "Get three pieces a week" },
];

type MarketingPageProps = {
  searchParams: Promise<{
    deleted?: string;
  }>;
};

export default async function MarketingPage({ searchParams }: MarketingPageProps) {
  const auth = await getAuthenticatedUserState();
  if (auth.available && auth.user) {
    redirect("/products");
  }
  const { deleted } = await searchParams;

  return (
    <main className="min-h-screen bg-charcoal text-cream">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-between px-6 py-8">
        <nav className="flex items-center justify-between">
          <span className="font-display text-2xl">StyleSoul</span>
          <Link
            href="/signin"
            className="inline-flex min-h-11 items-center rounded border border-gold px-4 py-2 text-sm text-gold transition hover:bg-gold hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            Sign in
          </Link>
        </nav>

        {deleted === "1" ? (
          <p
            role="status"
            className="mt-6 rounded border border-sage/40 bg-sage/10 px-4 py-3 text-sm text-cream"
          >
            Your account and all its data have been deleted.
          </p>
        ) : null}

        <div className="grid items-center gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <h1 className="font-display text-5xl leading-tight md:text-6xl">
              Clothes that suit you, picked every week.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/80">
              Take a quick photo to find your colours, add your measurements if
              you like, and we&apos;ll pick three pieces for you every week.
            </p>
            <div className="mt-10">
              <Link
                href="/signin"
                className="inline-flex min-h-11 items-center rounded bg-gold px-5 py-3 text-sm font-semibold text-charcoal transition hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Create your profile
              </Link>
            </div>
          </div>

          <SampleProfile />
        </div>

        <ol className="grid gap-4 border-t border-cream/15 pt-6 text-sm text-cream/75 md:grid-cols-3">
          {steps.map(({ Icon, label }, index) => (
            <li key={label} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                <Icon aria-hidden="true" size={18} />
              </span>
              <span>
                <span className="text-gold">{index + 1}.</span> {label}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-6 border-t border-cream/10 pb-2 pt-4 text-xs text-cream/60">
          Free while in preview.{" "}
          <Link
            href="/legal"
            className="text-gold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            Privacy &amp; terms
          </Link>
        </p>
      </section>
    </main>
  );
}

const sampleGuide = colourGuidance.soft_autumn;
const samplePieces = [
  { name: "Camel jumper", hex: sampleGuide.coloursToWear.swatches[2].hex },
  { name: "Teal shirt", hex: sampleGuide.coloursToWear.swatches[3].hex },
  { name: "Copper scarf", hex: sampleGuide.accentColours.swatches[0].hex },
];

function SampleProfile() {
  return (
    <aside
      aria-label="Example profile"
      className="rounded-xl border border-gold/25 bg-cream/[0.03] p-6"
    >
      <p className="text-xs uppercase tracking-[0.24em] text-gold">
        Example profile
      </p>
      <div className="mt-4 flex items-center gap-5">
        <Avatar shape="hourglass" season="soft_autumn" size={110} />
        <div>
          <p className="font-display text-3xl">{SEASON_LABELS.soft_autumn}</p>
          <p className="mt-1 text-sm text-cream/65">{SHAPE_LABELS.hourglass}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Colours that suit them">
            {sampleGuide.coloursToWear.swatches.map((swatch) => (
              <li
                key={swatch.name}
                title={swatch.name}
                className="h-6 w-6 rounded-full border border-cream/15"
                style={{ backgroundColor: swatch.hex }}
              >
                <span className="sr-only">{swatch.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-6 text-xs uppercase tracking-[0.2em] text-cream/60">
        This week
      </p>
      <ul className="mt-3 grid grid-cols-3 gap-3">
        {samplePieces.map((piece) => (
          <li key={piece.name}>
            <div
              aria-hidden="true"
              className="flex aspect-[4/5] items-center justify-center rounded-lg"
              style={{ backgroundColor: piece.hex }}
            >
              <Shirt className="text-charcoal/40" size={28} />
            </div>
            <p className="mt-2 text-xs text-cream/75">{piece.name}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
