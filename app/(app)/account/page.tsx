import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AccountDataControls } from "@/components/account/AccountDataControls";

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-charcoal px-6 py-16 text-cream">
      <section className="mx-auto max-w-4xl">
        <Link
          href="/profile"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          Back to profile
        </Link>
        <h1 className="mt-4 font-display text-5xl">Account</h1>
        <p className="mt-6 text-cream/75">
          StyleSoul is free during the preview, so there&apos;s nothing to
          manage here yet.
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
