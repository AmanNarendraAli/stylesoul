import { NextResponse } from "next/server";
import { requireUser } from "@/lib/server/require-user";
import { recordFunnelEvent } from "@/lib/server/funnel";

export async function POST() {
  const user = await requireUser();
  if (user instanceof NextResponse) return user;

  await recordFunnelEvent({
    userId: user.id,
    name: "first_edit_view",
  });

  return new NextResponse(null, {
    status: 204,
    headers: { "Cache-Control": "private, no-store" },
  });
}
