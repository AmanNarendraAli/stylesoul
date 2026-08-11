import { NextResponse } from "next/server";
import { getAuthenticatedUserState } from "@/lib/server/auth";
import { recordFunnelEvent } from "@/lib/server/funnel";

export async function POST() {
  const auth = await getAuthenticatedUserState();
  if (!auth.available) {
    return NextResponse.json(
      { message: "Authentication unavailable" },
      { status: 503 },
    );
  }
  if (!auth.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await recordFunnelEvent({
    userId: auth.user.id,
    name: "first_edit_view",
  });

  return new NextResponse(null, {
    status: 204,
    headers: { "Cache-Control": "private, no-store" },
  });
}
