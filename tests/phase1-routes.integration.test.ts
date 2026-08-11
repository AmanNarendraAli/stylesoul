// @vitest-environment node
import { NextRequest } from "next/server";
import { AuthRetryableFetchError } from "@supabase/supabase-js";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getUser: vi.fn(),
  exchangeCodeForSession: vi.fn(),
  findProfile: vi.fn(),
  upsertUser: vi.fn(),
  upsertProfile: vi.fn(),
  deleteWeeklyEdits: vi.fn(),
  recordFunnelEvent: vi.fn(),
  transaction: vi.fn(),
  assertAccountWritable: vi.fn(),
  AccountDeletedError: class AccountDeletedError extends Error {},
}));

const transactionClient = {
  user: { upsert: mocks.upsertUser },
  styleProfile: { upsert: mocks.upsertProfile },
  weeklyEdit: { deleteMany: mocks.deleteWeeklyEdits },
};

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => ({
    auth: {
      getUser: mocks.getUser,
      exchangeCodeForSession: mocks.exchangeCodeForSession,
    },
  })),
}));

vi.mock("@/lib/db/prisma", () => ({
  prisma: {
    $transaction: mocks.transaction,
    user: { upsert: mocks.upsertUser },
    styleProfile: {
      findUnique: mocks.findProfile,
      upsert: mocks.upsertProfile,
    },
  },
}));
vi.mock("@/lib/server/account-lifecycle", () => ({
  AccountDeletedError: mocks.AccountDeletedError,
  assertAccountWritable: mocks.assertAccountWritable,
}));

vi.mock("@/lib/server/funnel", () => ({
  recordFunnelEvent: mocks.recordFunnelEvent,
}));

import { GET as authCallback } from "@/app/auth/callback/route";
import { GET as readProfile, POST as writeProfile } from "@/app/api/profile/route";

const user = {
  id: "user-1",
  email: "person@example.com",
  created_at: "2026-07-01T09:00:00.000Z",
};
const validInput = {
  heightCm: 170,
  weightKg: 64,
  bustCm: 90,
  waistCm: 65,
  hipsCm: 90,
  shouldersCm: 40,
  skinTone: "fair",
  undertone: "warm",
  eyeColour: "green",
  hairColour: "golden_blonde",
  temperature: "warm",
  value: "light",
  chroma: "bright",
  contrast: "medium",
};

beforeEach(() => {
  mocks.getUser.mockResolvedValue({ data: { user } });
  mocks.exchangeCodeForSession.mockResolvedValue({ data: { user }, error: null });
  mocks.findProfile.mockReset();
  mocks.upsertUser.mockReset();
  mocks.upsertProfile.mockReset();
  mocks.deleteWeeklyEdits.mockReset();
  mocks.recordFunnelEvent.mockReset();
  mocks.transaction.mockReset();
  mocks.transaction.mockImplementation(
    (operation: (transaction: typeof transactionClient) => Promise<unknown>) =>
      operation(transactionClient),
  );
  mocks.assertAccountWritable.mockReset();
  mocks.assertAccountWritable.mockResolvedValue(undefined);
});

describe("OAuth callback", () => {
  it("exchanges the code before continuing to the profile entry point", async () => {
    const response = await authCallback(
      new NextRequest("http://localhost/auth/callback?code=oauth-code"),
    );

    expect(mocks.exchangeCodeForSession).toHaveBeenCalledWith("oauth-code");
    expect(mocks.recordFunnelEvent).toHaveBeenCalledWith({
      userId: user.id,
      name: "signup_complete",
      email: user.email,
      occurredAt: new Date(user.created_at),
    });
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost/profile");
  });

  it("returns a missing-code callback to sign in with an error", async () => {
    const response = await authCallback(
      new NextRequest("http://localhost/auth/callback"),
    );

    expect(mocks.exchangeCodeForSession).not.toHaveBeenCalled();
    expect(response.headers.get("location")).toBe(
      "http://localhost/signin?error=oauth",
    );
  });

  it("returns an invalid or expired callback to sign in with an error", async () => {
    mocks.exchangeCodeForSession.mockResolvedValueOnce({
      data: {},
      error: new Error("expired code"),
    });

    const response = await authCallback(
      new NextRequest("http://localhost/auth/callback?code=expired-code"),
    );

    expect(response.headers.get("location")).toBe(
      "http://localhost/signin?error=oauth",
    );
  });

  it("returns an exchange exception to sign in with an error", async () => {
    mocks.exchangeCodeForSession.mockRejectedValueOnce(
      new Error("auth service unavailable"),
    );

    const response = await authCallback(
      new NextRequest("http://localhost/auth/callback?code=oauth-code"),
    );

    expect(response.headers.get("location")).toBe(
      "http://localhost/signin?error=oauth",
    );
  });
});

describe("authenticated profile API", () => {
  it("rejects unauthenticated reads", async () => {
    mocks.getUser.mockResolvedValueOnce({ data: { user: null } });

    const response = await readProfile();

    expect(response.status).toBe(401);
  });

  it("rejects unauthenticated writes", async () => {
    mocks.getUser.mockResolvedValueOnce({ data: { user: null } });

    const response = await writeProfile(
      new NextRequest("http://localhost/api/profile", {
        method: "POST",
        body: JSON.stringify(validInput),
        headers: { "content-type": "application/json" },
      }),
    );

    expect(response.status).toBe(401);
    expect(mocks.upsertProfile).not.toHaveBeenCalled();
  });

  it("rejects authenticated users without an email", async () => {
    mocks.getUser.mockResolvedValueOnce({
      data: { user: { id: "user-1", email: null } },
    });

    const response = await writeProfile(
      new NextRequest("http://localhost/api/profile", {
        method: "POST",
        body: JSON.stringify(validInput),
        headers: { "content-type": "application/json" },
      }),
    );

    expect(response.status).toBe(400);
    expect(mocks.upsertProfile).not.toHaveBeenCalled();
  });

  it("returns a service-unavailable response when auth cannot be checked", async () => {
    mocks.getUser.mockRejectedValueOnce(new Error("auth unavailable"));

    const response = await readProfile();

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({
      message: "Authentication unavailable",
    });
  });

  it("returns service unavailable for resolved retryable auth errors", async () => {
    mocks.getUser.mockResolvedValueOnce({
      data: { user: null },
      error: new AuthRetryableFetchError("auth unavailable", 503),
    });

    const response = await readProfile();

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({
      message: "Authentication unavailable",
    });
  });

  it("returns not found when the authenticated user has no profile", async () => {
    mocks.findProfile.mockResolvedValueOnce(null);

    const response = await readProfile();

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ message: "Profile not found" });
  });

  it("creates a derived profile at analysis version two", async () => {
    const createdAt = new Date("2026-07-14T10:00:00.000Z");
    mocks.upsertProfile.mockResolvedValue({
      id: "profile-1",
      analysisVersion: 2,
      createdAt,
    });

    const response = await writeProfile(
      new NextRequest("http://localhost/api/profile", {
        method: "POST",
        body: JSON.stringify(validInput),
        headers: { "content-type": "application/json" },
      }),
    );

    expect(response.status).toBe(200);
    expect(mocks.upsertUser).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: user.id } }),
    );
    expect(mocks.upsertProfile).toHaveBeenCalledWith(
      expect.objectContaining({
        create: expect.objectContaining({
          analysisVersion: 2,
          userId: user.id,
          temperature: "warm",
          value: "light",
          chroma: "bright",
          contrast: "medium",
        }),
        update: expect.objectContaining({
          analysisVersion: 2,
          temperature: "warm",
          value: "light",
          chroma: "bright",
          contrast: "medium",
        }),
      }),
    );
    expect(mocks.deleteWeeklyEdits).toHaveBeenCalledWith({
      where: {
        userId: user.id,
        weekStart: { gte: expect.any(Date) },
      },
    });
    expect(mocks.recordFunnelEvent).toHaveBeenCalledWith({
      userId: user.id,
      name: "analysis_complete",
      occurredAt: createdAt,
    });
  });

  it("keeps the derived analysis version at two when analysis is rerun", async () => {
    const firstAnalysisAt = new Date("2026-06-01T10:00:00.000Z");
    mocks.upsertProfile.mockResolvedValue({
      id: "profile-1",
      analysisVersion: 2,
      createdAt: firstAnalysisAt,
    });

    const response = await writeProfile(
      new NextRequest("http://localhost/api/profile", {
        method: "POST",
        body: JSON.stringify({ ...validInput, waistCm: 70 }),
        headers: { "content-type": "application/json" },
      }),
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.profile.analysisVersion).toBe(2);
    expect(mocks.upsertProfile).toHaveBeenCalledWith(
      expect.objectContaining({
        update: expect.objectContaining({
          waistCm: 70,
          analysisVersion: 2,
          temperature: "warm",
          value: "light",
          chroma: "bright",
          contrast: "medium",
        }),
      }),
    );
    expect(mocks.recordFunnelEvent).toHaveBeenCalledWith({
      userId: user.id,
      name: "analysis_complete",
      occurredAt: firstAnalysisAt,
    });
  });

  it("returns validation failures without writing", async () => {
    const response = await writeProfile(
      new NextRequest("http://localhost/api/profile", {
        method: "POST",
        body: JSON.stringify({ ...validInput, skinTone: "purple" }),
        headers: { "content-type": "application/json" },
      }),
    );

    expect(response.status).toBe(400);
    expect(mocks.upsertUser).not.toHaveBeenCalled();
    expect(mocks.upsertProfile).not.toHaveBeenCalled();
  });

  it("returns malformed JSON failures without writing", async () => {
    const response = await writeProfile(
      new NextRequest("http://localhost/api/profile", {
        method: "POST",
        body: "{not-json",
        headers: { "content-type": "application/json" },
      }),
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ message: "Invalid JSON" });
    expect(mocks.upsertUser).not.toHaveBeenCalled();
    expect(mocks.upsertProfile).not.toHaveBeenCalled();
  });

  it("rejects a write after account deletion begins", async () => {
    mocks.assertAccountWritable.mockRejectedValue(
      new mocks.AccountDeletedError(),
    );

    const response = await writeProfile(
      new NextRequest("http://localhost/api/profile", {
        method: "POST",
        body: JSON.stringify(validInput),
        headers: { "content-type": "application/json" },
      }),
    );

    expect(response.status).toBe(409);
    expect(await response.json()).toEqual({
      message: "Account deletion is in progress",
    });
    expect(mocks.upsertUser).not.toHaveBeenCalled();
    expect(mocks.upsertProfile).not.toHaveBeenCalled();
    expect(mocks.recordFunnelEvent).not.toHaveBeenCalled();
  });

  it("returns the authenticated user's current profile", async () => {
    const profile = { id: "profile-1", userId: user.id, analysisVersion: 2 };
    mocks.findProfile.mockResolvedValue(profile);

    const response = await readProfile();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ profile });
    expect(mocks.findProfile).toHaveBeenCalledWith({ where: { userId: user.id } });
  });
});
