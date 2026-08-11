import "server-only";

import {
  isAuthSessionMissingError,
  type User,
} from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

export type AuthState =
  | { available: true; user: User | null }
  | { available: false; user: null };

export async function getAuthenticatedUserState(): Promise<AuthState> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      const unauthenticated =
        isAuthSessionMissingError(error) ||
        error.status === 401 ||
        error.status === 403 ||
        error.status === 404;
      return { available: unauthenticated, user: null };
    }

    return { available: true, user };
  } catch {
    return { available: false, user: null };
  }
}

export function isAdminUser(user: User) {
  return user.app_metadata?.role === "admin";
}

export type AdminAuthState =
  | { ok: true; actor: { id: string; email: string } }
  | {
      ok: false;
      status: 400 | 401 | 403 | 503;
      message: string;
    };

export async function getAdminActorState(): Promise<AdminAuthState> {
  const auth = await getAuthenticatedUserState();
  if (!auth.available) {
    return {
      ok: false,
      status: 503,
      message: "Authentication unavailable",
    };
  }
  if (!auth.user) {
    return { ok: false, status: 401, message: "Unauthorized" };
  }
  if (!isAdminUser(auth.user)) {
    return { ok: false, status: 403, message: "Admin role required" };
  }
  if (!auth.user.email) {
    return {
      ok: false,
      status: 400,
      message: "Authenticated admin is missing an email address",
    };
  }
  return {
    ok: true,
    actor: { id: auth.user.id, email: auth.user.email },
  };
}
