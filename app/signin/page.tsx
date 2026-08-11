import Link from "next/link";
import { signInWithGoogle } from "./actions";

type SignInPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams;
  const errorMessage =
    params.error === "oauth"
      ? "Google sign-in could not be completed. Try again."
      : "Something went wrong. Try again in a moment.";

  return (
    <main className="flex min-h-screen items-center justify-center bg-charcoal px-6 text-cream">
      <section className="w-full max-w-md">
        <p className="text-sm uppercase tracking-[0.24em] text-gold">
          StyleSoul
        </p>
        <h1 className="mt-4 font-display text-5xl">Sign in</h1>
        <p className="mt-4 text-cream/75">
          Continue securely with your Google account.
        </p>

        <form action={signInWithGoogle} className="mt-8">
          <button
            type="submit"
            className="min-h-11 w-full rounded bg-gold px-5 py-3 text-sm font-semibold text-charcoal transition hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            Continue with Google
          </button>
        </form>
        <p className="mt-5 text-xs leading-5 text-cream/60">
          Before using the preview, read the{" "}
          <Link
            href="/legal"
            className="text-gold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            privacy policy and terms
          </Link>
          .
        </p>

        {params.error ? (
          <p role="alert" className="mt-5 rounded border border-blush/50 bg-blush/10 px-4 py-3 text-sm text-cream">
            {errorMessage}
          </p>
        ) : null}
      </section>
    </main>
  );
}
