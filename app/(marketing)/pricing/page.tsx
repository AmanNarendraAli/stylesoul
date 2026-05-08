import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-charcoal px-6 py-16 text-cream">
      <section className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-gold">
          StyleSoul
        </Link>
        <h1 className="mt-8 font-display text-5xl">£9.99 / month</h1>
        <p className="mt-4 text-lg leading-8 text-cream/80">
          Full access during the free trial, then one simple monthly membership.
        </p>
        <Link
          href="/signin"
          className="mt-8 inline-flex rounded bg-gold px-5 py-3 text-sm font-semibold text-charcoal"
        >
          Start free trial
        </Link>
      </section>
    </main>
  );
}
