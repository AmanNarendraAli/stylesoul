import { redirect } from "next/navigation";
import { signInPath } from "@/lib/auth-redirect";
import { hasStyleProfile } from "@/lib/server/profile";
import { createClient } from "@/lib/supabase/server";

export default async function OnboardingEntryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(signInPath("/onboarding"));
  }

  const hasProfile = await hasStyleProfile(user.id);

  if (hasProfile) {
    redirect("/profile");
  }

  redirect("/onboarding/colouring");
}
