import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getAuthenticatedUserState: vi.fn(),
  buildAccountExport: vi.fn(),
  deleteAccountDatabaseData: vi.fn(),
  getSupabaseAdminClient: vi.fn(),
  deleteAuthUser: vi.fn(),
  createClient: vi.fn(),
  signOut: vi.fn(),
  reportServerError: vi.fn(),
}));

vi.mock("@/lib/server/auth", () => ({
  getAuthenticatedUserState: mocks.getAuthenticatedUserState,
}));
vi.mock("@/lib/server/account-data", () => ({
  buildAccountExport: mocks.buildAccountExport,
  deleteAccountDatabaseData: mocks.deleteAccountDatabaseData,
}));
vi.mock("@/lib/supabase/admin", () => ({
  getSupabaseAdminClient: mocks.getSupabaseAdminClient,
}));
vi.mock("@/lib/supabase/server", () => ({
  createClient: mocks.createClient,
}));
vi.mock("@/lib/observability/redact", () => ({
  reportServerError: mocks.reportServerError,
}));

import { GET as exportAccount } from "@/app/api/account/export/route";
import { DELETE as deleteAccount } from "@/app/api/account/route";

const user = {
  id: "user-1",
  email: "person@example.com",
  phone: null,
  created_at: "2026-07-01T10:00:00.000Z",
  updated_at: "2026-07-02T10:00:00.000Z",
  last_sign_in_at: "2026-07-14T10:00:00.000Z",
  app_metadata: { role: "authenticated" },
  user_metadata: { display_name: "Person" },
};

beforeEach(() => {
  mocks.signOut.mockResolvedValue({ error: null });
  mocks.createClient.mockResolvedValue({ auth: { signOut: mocks.signOut } });
  mocks.getAuthenticatedUserState.mockResolvedValue({ available: true, user });
  mocks.buildAccountExport.mockResolvedValue({
    format: "stylesoul-account-export",
    version: 1,
    authentication: { id: user.id },
  });
  mocks.deleteAccountDatabaseData.mockResolvedValue({
    deletedAccountRows: 1,
  });
  mocks.deleteAuthUser.mockResolvedValue({ data: {}, error: null });
  mocks.getSupabaseAdminClient.mockReturnValue({
    auth: { admin: { deleteUser: mocks.deleteAuthUser } },
  });
});

describe("account data routes", () => {
  it("rejects unauthenticated export and deletion requests", async () => {
    mocks.getAuthenticatedUserState.mockResolvedValue({
      available: true,
      user: null,
    });

    expect((await exportAccount()).status).toBe(401);
    expect((await deleteAccount()).status).toBe(401);
    expect(mocks.buildAccountExport).not.toHaveBeenCalled();
    expect(mocks.deleteAccountDatabaseData).not.toHaveBeenCalled();
  });

  it("exports the authenticated identity with download and no-store headers", async () => {
    const response = await exportAccount();

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    expect(response.headers.get("content-disposition")).toMatch(
      /^attachment; filename="stylesoul-data-export-\d{4}-\d{2}-\d{2}\.json"$/,
    );
    expect(mocks.buildAccountExport).toHaveBeenCalledWith({
      id: user.id,
      email: user.email,
      phone: null,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      lastSignInAt: user.last_sign_in_at,
      appMetadata: user.app_metadata,
      userMetadata: user.user_metadata,
    });
    expect(await response.json()).toMatchObject({
      format: "stylesoul-account-export",
      authentication: { id: user.id },
    });
  });

  it("does not delete database data when the Auth admin client is unavailable", async () => {
    mocks.getSupabaseAdminClient.mockReturnValue(null);

    const response = await deleteAccount();

    expect(response.status).toBe(503);
    expect(mocks.deleteAccountDatabaseData).not.toHaveBeenCalled();
    expect(mocks.deleteAuthUser).not.toHaveBeenCalled();
  });

  it("preserves Auth and the session when database deletion fails", async () => {
    const databaseError = new Error("Database unavailable");
    mocks.deleteAccountDatabaseData.mockRejectedValue(databaseError);

    const response = await deleteAccount();

    expect(response.status).toBe(500);
    expect(mocks.deleteAuthUser).not.toHaveBeenCalled();
    expect(mocks.signOut).not.toHaveBeenCalled();
    expect(mocks.reportServerError).toHaveBeenCalledWith(
      "account_database_deletion_failed",
      databaseError,
      { userId: user.id },
    );
  });

  it("deletes database data before the Supabase Auth identity", async () => {
    const response = await deleteAccount();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ deleted: true });
    expect(mocks.deleteAccountDatabaseData).toHaveBeenCalledWith(user.id);
    expect(mocks.deleteAuthUser).toHaveBeenCalledWith(user.id);
    expect(
      mocks.deleteAccountDatabaseData.mock.invocationCallOrder[0],
    ).toBeLessThan(mocks.deleteAuthUser.mock.invocationCallOrder[0]);
    expect(mocks.signOut).toHaveBeenCalledWith({ scope: "local" });
    expect(mocks.deleteAuthUser.mock.invocationCallOrder[0]).toBeLessThan(
      mocks.signOut.mock.invocationCallOrder[0],
    );
  });

  it("does not relabel a completed deletion when session cleanup fails", async () => {
    const cleanupError = new Error("Cookie cleanup failed");
    mocks.signOut.mockRejectedValue(cleanupError);

    const response = await deleteAccount();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ deleted: true });
    expect(mocks.reportServerError).toHaveBeenCalledWith(
      "account_session_cleanup_failed",
      cleanupError,
      { userId: user.id },
    );
  });

  it("returns a retryable partial-failure response when Auth deletion fails", async () => {
    mocks.deleteAuthUser.mockResolvedValue({
      data: {},
      error: { status: 500, message: "Auth unavailable" },
    });

    const response = await deleteAccount();

    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({
      message: "Account sign-in deletion did not complete. Retry the request.",
    });
    expect(mocks.reportServerError).toHaveBeenCalledWith(
      "account_auth_deletion_failed",
      expect.anything(),
      { userId: user.id },
    );
    expect(mocks.signOut).not.toHaveBeenCalled();
  });

  it("treats an already-absent Auth identity as deleted", async () => {
    mocks.deleteAuthUser.mockResolvedValue({
      data: {},
      error: { status: 404, message: "User not found" },
    });

    expect((await deleteAccount()).status).toBe(200);
  });
});
