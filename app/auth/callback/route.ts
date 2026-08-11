import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { recordFunnelEvent } from "@/lib/server/funnel";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const providerError = requestUrl.searchParams.get("error");

  if (providerError || !code) {
    return NextResponse.redirect(new URL("/signin?error=oauth", request.url));
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(new URL("/signin?error=oauth", request.url));
    }
    if (data.user?.email) {
      await recordFunnelEvent({
        userId: data.user.id,
        name: "signup_complete",
        email: data.user.email,
        occurredAt: new Date(data.user.created_at),
      });
    }
  } catch {
    return NextResponse.redirect(new URL("/signin?error=oauth", request.url));
  }

  return NextResponse.redirect(new URL("/profile", request.url));
}
