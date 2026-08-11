import { NextResponse } from "next/server";
import { buildAccountExport } from "@/lib/server/account-data";
import { getAuthenticatedUserState } from "@/lib/server/auth";

export async function GET() {
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

  const { user } = auth;
  const accountExport = await buildAccountExport({
    id: user.id,
    email: user.email ?? null,
    phone: user.phone ?? null,
    createdAt: user.created_at,
    updatedAt: user.updated_at ?? null,
    lastSignInAt: user.last_sign_in_at ?? null,
    appMetadata: user.app_metadata,
    userMetadata: user.user_metadata,
  });
  const date = new Date().toISOString().slice(0, 10);

  return NextResponse.json(accountExport, {
    headers: {
      "Cache-Control": "private, no-store",
      "Content-Disposition": `attachment; filename="stylesoul-data-export-${date}.json"`,
    },
  });
}
