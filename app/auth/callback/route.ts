import { NextResponse, type NextRequest } from "next/server";
import { safeNextPath } from "@/lib/auth-redirect";
import { createClient } from "@/lib/supabase/server";
import { recordFunnelEvent } from "@/lib/server/funnel";
import { hasStyleProfile } from "@/lib/server/profile";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  // Behind a proxy, request.url is the server's own address (e.g.
  // localhost:3000), so redirect relative to the public origin the sign-in
  // action sent to Google.
  const origin = process.env.NEXT_PUBLIC_APP_URL ?? requestUrl.origin;
  const code = requestUrl.searchParams.get("code");
  const providerError = requestUrl.searchParams.get("error");

  if (providerError || !code) {
    return NextResponse.redirect(new URL("/signin?error=oauth", origin));
  }

  let userId: string | undefined;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(new URL("/signin?error=oauth", origin));
    }
    userId = data.user?.id;
    if (data.user?.email) {
      await recordFunnelEvent({
        userId: data.user.id,
        name: "signup_complete",
        email: data.user.email,
        occurredAt: new Date(data.user.created_at),
      });
    }
  } catch {
    return NextResponse.redirect(new URL("/signin?error=oauth", origin));
  }

  const next =
    safeNextPath(requestUrl.searchParams.get("next")) ??
    (await defaultDestination(userId));
  return NextResponse.redirect(new URL(next, origin));
}

// If the lookup fails, /products still links to onboarding when no profile exists.
async function defaultDestination(userId: string | undefined) {
  const hasProfile = userId
    ? await hasStyleProfile(userId).catch(() => true)
    : true;
  return hasProfile ? "/products" : "/onboarding";
}
