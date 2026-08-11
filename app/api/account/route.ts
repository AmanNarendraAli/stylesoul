import { NextResponse } from "next/server";
import { reportServerError } from "@/lib/observability/redact";
import { deleteAccountDatabaseData } from "@/lib/server/account-data";
import { getAuthenticatedUserState } from "@/lib/server/auth";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function DELETE() {
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

  const admin = getSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json(
      { message: "Account deletion is unavailable" },
      { status: 503 },
    );
  }

  try {
    await deleteAccountDatabaseData(auth.user.id);
  } catch (error) {
    reportServerError("account_database_deletion_failed", error, {
      userId: auth.user.id,
    });
    return NextResponse.json(
      { message: "Account deletion failed" },
      { status: 500 },
    );
  }

  const { error } = await admin.auth.admin.deleteUser(auth.user.id);
  if (error && error.status !== 404) {
    reportServerError("account_auth_deletion_failed", error, {
      userId: auth.user.id,
    });
    return NextResponse.json(
      { message: "Account sign-in deletion did not complete. Retry the request." },
      { status: 502 },
    );
  }
  try {
    const supabase = await createClient();
    const { error: signOutError } = await supabase.auth.signOut({
      scope: "local",
    });
    if (signOutError) {
      reportServerError("account_session_cleanup_failed", signOutError, {
        userId: auth.user.id,
      });
    }
  } catch (error) {
    reportServerError("account_session_cleanup_failed", error, {
      userId: auth.user.id,
    });
  }

  return NextResponse.json(
    { deleted: true },
    { headers: { "Cache-Control": "no-store" } },
  );
}
