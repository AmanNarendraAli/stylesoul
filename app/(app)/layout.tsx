import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PATHNAME_HEADER, signInPath } from "@/lib/auth-redirect";
import { createClient } from "@/lib/supabase/server";
import { logOut } from "./actions";
import { NavLinks } from "./NavLinks";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(signInPath((await headers()).get(PATHNAME_HEADER)));
  }

  return (
    <>
      <header className="border-b border-cream/10 bg-charcoal px-4 py-2 text-cream sm:px-6">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4">
          <Link
            href="/products"
            className="font-display text-2xl transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            StyleSoul
          </Link>
          <div className="flex items-center gap-4 text-sm text-cream/75 sm:gap-5">
            <NavLinks />
            <form action={logOut}>
              <button
                type="submit"
                className="inline-flex min-h-11 cursor-pointer items-center border-0 bg-transparent p-0 text-sm text-cream/75 transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Log out
              </button>
            </form>
          </div>
        </nav>
      </header>
      {children}
    </>
  );
}
