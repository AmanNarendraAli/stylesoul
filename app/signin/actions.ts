"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signInWithEmail(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    redirect("/signin?error=missing_email");
  }

  const supabase = await createClient();
  const origin = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error?.code === "over_email_send_rate_limit" || error?.status === 429) {
    redirect("/signin?error=rate_limit");
  }

  if (error) {
    redirect("/signin?error=auth");
  }

  redirect("/signin?sent=1");
}
