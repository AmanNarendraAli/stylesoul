import "server-only";

import type { User } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { getAuthenticatedUserState } from "@/lib/server/auth";

// Kept separate from auth.ts so route tests that mock getAuthenticatedUserState
// still exercise this 503/401 mapping.
export async function requireUser(): Promise<User | NextResponse> {
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
  return auth.user;
}
