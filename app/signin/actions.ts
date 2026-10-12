"use server";

import { redirect } from "next/navigation";
import { safeNextPath } from "@/lib/auth-redirect";
import { createClient } from "@/lib/supabase/server";

export async function signInWithGoogle(formData?: FormData) {
  const supabase = await createClient();
  const origin = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const next = safeNextPath(formData?.get("next"));

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: next
        ? `${origin}/auth/callback?next=${encodeURIComponent(next)}`
        : `${origin}/auth/callback`,
    },
  });

  if (error || !data.url) {
    redirect("/signin?error=oauth");
  }

  redirect(data.url);
}
