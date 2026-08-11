import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthenticatedUserState } from "@/lib/server/auth";

export default async function MarketingPage() {
  const auth = await getAuthenticatedUserState();
  if (auth.available && auth.user) {
    redirect("/products");
  }

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

        <div className="max-w-3xl py-20">
          <p className="mb-4 text-sm uppercase tracking-[0.24em] text-gold">
            Your Personal Style Intelligence
          </p>
          <h1 className="font-display text-5xl leading-tight md:text-7xl">
            A lifelong fashion compass, built around you.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/80">
            Build your style profile from five required body measurements,
            optional weight, and natural colouring including undertone, then
            explore a three-piece weekly edit with direct retailer links.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/signin"
              className="inline-flex min-h-11 items-center rounded bg-gold px-5 py-3 text-sm font-semibold text-charcoal transition hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Create your profile
            </Link>
            <Link
              href="/pricing"
              className="inline-flex min-h-11 items-center rounded border border-cream/25 px-5 py-3 text-sm text-cream transition hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              What&apos;s included
            </Link>
          </div>
        </div>

        <div className="grid gap-4 border-t border-cream/15 pt-6 text-sm text-cream/75 md:grid-cols-4">
          <p>Five measurements + optional weight</p>
          <p>Seasonal colour with undertone</p>
          <p>Personalised avatar</p>
          <p>Three-piece weekly edit</p>
        </div>
        <p className="mt-6 border-t border-cream/10 pb-2 pt-4 text-xs text-cream/60">
          Responsive web preview. Payments and affiliate links are not active.{" "}
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
