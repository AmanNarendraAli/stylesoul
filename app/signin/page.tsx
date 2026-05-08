import { signInWithEmail } from "./actions";

type SignInPageProps = {
  searchParams: Promise<{
    error?: string;
    sent?: string;
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-charcoal px-6 text-cream">
      <section className="w-full max-w-md">
        <p className="text-sm uppercase tracking-[0.24em] text-gold">
          StyleSoul
        </p>
        <h1 className="mt-4 font-display text-5xl">Sign in</h1>
        <p className="mt-4 text-cream/75">
          Enter your email and we&apos;ll send you a magic link.
        </p>

        <form action={signInWithEmail} className="mt-8 space-y-4">
          <label className="block text-sm text-cream/80" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded border border-cream/20 bg-cream/5 px-4 py-3 text-cream outline-none transition focus:border-gold"
            placeholder="you@example.com"
          />
          <button
            type="submit"
            className="w-full rounded bg-gold px-5 py-3 text-sm font-semibold text-charcoal transition hover:bg-cream"
          >
            Send magic link
          </button>
        </form>

        {params.sent ? (
          <p className="mt-5 rounded border border-sage/50 bg-sage/10 px-4 py-3 text-sm text-cream">
            Check your email for the sign-in link.
          </p>
        ) : null}

        {params.error ? (
          <p className="mt-5 rounded border border-blush/50 bg-blush/10 px-4 py-3 text-sm text-cream">
            Something went wrong. Try again in a moment.
          </p>
        ) : null}
      </section>
    </main>
  );
}
