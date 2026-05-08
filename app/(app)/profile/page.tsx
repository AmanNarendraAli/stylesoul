import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen bg-charcoal px-6 py-16 text-cream">
      <section className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.24em] text-gold">Profile</p>
        <h1 className="mt-4 font-display text-5xl">Your StyleSoul profile</h1>
        <p className="mt-6 text-cream/75">
          Manual onboarding begins in Phase 1. You are signed in as {user.email}.
        </p>
      </section>
    </main>
  );
}
