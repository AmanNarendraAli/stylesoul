import Link from "next/link";

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-charcoal text-cream">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-between px-6 py-8">
        <nav className="flex items-center justify-between">
          <span className="font-display text-2xl">StyleSoul</span>
          <Link
            href="/signin"
            className="rounded border border-gold px-4 py-2 text-sm text-gold transition hover:bg-gold hover:text-charcoal"
          >
            Start
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
            Build your style DNA from body composition and natural colouring,
            then receive a weekly edit matched to your silhouette and palette.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/signin"
              className="rounded bg-gold px-5 py-3 text-sm font-semibold text-charcoal transition hover:bg-cream"
            >
              Start free trial
            </Link>
            <Link
              href="/pricing"
              className="rounded border border-cream/25 px-5 py-3 text-sm text-cream transition hover:border-gold hover:text-gold"
            >
              £9.99 / month
            </Link>
          </div>
        </div>

        <div className="grid gap-4 border-t border-cream/15 pt-6 text-sm text-cream/75 md:grid-cols-4">
          <p>Body composition analysis</p>
          <p>Seasonal colour profiling</p>
          <p>Personalised avatar</p>
          <p>Weekly curated edit</p>
        </div>
      </section>
    </main>
  );
}
