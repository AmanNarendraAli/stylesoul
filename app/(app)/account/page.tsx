import Link from "next/link";
import { AccountDataControls } from "@/components/account/AccountDataControls";

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-charcoal px-6 py-16 text-cream">
      <section className="mx-auto max-w-4xl">
        <h1 className="font-display text-5xl">Account</h1>
        <p className="mt-6 text-cream/75">
          Subscription and payment management are not available in the current
          web MVP. StyleSoul does not collect charges through this app.
        </p>
        <Link
          href="/legal"
          className="mt-6 inline-flex min-h-11 items-center text-sm text-gold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          Privacy policy and terms
        </Link>
        <AccountDataControls />
      </section>
    </main>
  );
}
