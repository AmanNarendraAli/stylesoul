import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-charcoal px-6 py-16 text-cream">
      <section className="mx-auto max-w-3xl">
        <Link href="/" className="inline-flex min-h-11 items-center text-sm text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
          StyleSoul
        </Link>
        <h1 className="mt-8 font-display text-5xl">Web preview access</h1>
        <p className="mt-4 text-lg leading-8 text-cream/80">
          The current web MVP is available for product testing without charge.
          Pricing, trials, subscriptions, and payment collection are not live.
        </p>
        <Link
          href="/signin"
          className="mt-8 inline-flex min-h-11 items-center rounded bg-gold px-5 py-3 text-sm font-semibold text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          Create your profile
        </Link>
      </section>
    </main>
  );
}
