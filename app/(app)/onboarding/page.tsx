import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { createClient } from "@/lib/supabase/server";

export default async function OnboardingEntryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  const profile = await prisma.styleProfile.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });

  if (profile) {
    redirect("/profile");
  }

  redirect("/onboarding/body");
}
