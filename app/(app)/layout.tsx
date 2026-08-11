import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logOut } from "./actions";

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
    redirect("/signin");
  }

  return (
    <>
      <header className="border-b border-cream/10 bg-charcoal px-4 py-4 text-cream sm:px-6">
        <nav className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/products"
            className="font-display text-2xl transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            StyleSoul
          </Link>
          <div className="flex items-center gap-5 text-sm text-cream/75">
            <Link
              href="/products"
              className="transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Home
            </Link>
            <Link
              href="/profile"
              className="transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Profile
            </Link>
            <form action={logOut}>
              <button
                type="submit"
                className="cursor-pointer border-0 bg-transparent p-0 text-sm text-cream/75 transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
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
