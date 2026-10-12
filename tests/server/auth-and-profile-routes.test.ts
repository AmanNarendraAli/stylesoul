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
import {
  deriveDimensions,
  mapColourSeason,
  type Colouring,
} from "@/lib/colour-season/map";

const user = {
  id: "user-1",
  email: "person@example.com",
  created_at: "2026-07-01T09:00:00.000Z",
};
const colouring: Colouring = {
  skinTone: "fair",
  undertone: "warm",
  eyeColour: "green",
  hairColour: "golden_blonde",
};
const validInput = {
  heightCm: 170,
  weightKg: 64,
  bustCm: 90,
  waistCm: 65,
  hipsCm: 90,
  shouldersCm: 40,
  ...colouring,
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
  beforeEach(() => {
    mocks.findProfile.mockResolvedValue({ id: "profile-1" });
  });

  it("exchanges the code and sends a returning user to this week's edit", async () => {
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
    expect(response.headers.get("location")).toBe("http://localhost/products");
  });

  it("sends a user without a saved profile to onboarding", async () => {
    mocks.findProfile.mockResolvedValue(null);

    const response = await authCallback(
      new NextRequest("http://localhost/auth/callback?code=oauth-code"),
    );

    expect(mocks.findProfile).toHaveBeenCalledWith(
      expect.objectContaining({ where: { userId: user.id } }),
    );
    expect(response.headers.get("location")).toBe("http://localhost/onboarding");
  });

  it("falls back to this week's edit when the profile lookup fails", async () => {
    mocks.findProfile.mockRejectedValue(new Error("database unavailable"));

    const response = await authCallback(
      new NextRequest("http://localhost/auth/callback?code=oauth-code"),
    );

    expect(response.headers.get("location")).toBe("http://localhost/products");
  });

  it("continues to a safe same-origin next path after sign-in", async () => {
    const response = await authCallback(
      new NextRequest(
        "http://localhost/auth/callback?code=oauth-code&next=%2Fonboarding%2Fbody",
      ),
    );

    expect(response.headers.get("location")).toBe(
      "http://localhost/onboarding/body",
    );
  });

  it("redirects to the public app origin when served behind a proxy", async () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://stylesoul.example");
    try {
      const response = await authCallback(
        new NextRequest("http://localhost:3000/auth/callback?code=oauth-code"),
      );
      expect(response.headers.get("location")).toBe(
        "https://stylesoul.example/products",
      );
    } finally {
      vi.unstubAllEnvs();
    }
  });

  it("ignores an off-site next path after sign-in", async () => {
    const response = await authCallback(
      new NextRequest(
        "http://localhost/auth/callback?code=oauth-code&next=%2F%2Fevil.example",
      ),
    );

    expect(response.headers.get("location")).toBe("http://localhost/products");
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

  it("saves the profile for the authenticated user, clears current-week edits, and records analysis_complete", async () => {
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
          userId: user.id,
          ...colouring,
          ...deriveDimensions(colouring),
          colourSeason: mapColourSeason(colouring),
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

  it("saves a colour-only profile without wiping previously saved measurements", async () => {
    mocks.upsertProfile.mockResolvedValue({
      id: "profile-1",
      createdAt: new Date("2026-07-14T10:00:00.000Z"),
    });

    const response = await writeProfile(
      new NextRequest("http://localhost/api/profile", {
        method: "POST",
        body: JSON.stringify(colouring),
        headers: { "content-type": "application/json" },
      }),
    );

    expect(response.status).toBe(200);
    const [{ create, update }] = mocks.upsertProfile.mock.calls[0];
    expect(create).toMatchObject({
      userId: user.id,
      ...colouring,
      bodyShape: null,
      colourSeason: mapColourSeason(colouring),
    });
    expect(update).toMatchObject({ colourSeason: mapColourSeason(colouring) });
    for (const key of [
      "heightCm",
      "bustCm",
      "waistCm",
      "hipsCm",
      "shouldersCm",
      "bodyShape",
    ]) {
      expect(update[key]).toBeUndefined();
    }
  });

  it("saves bust, waist and hips alone, clearing optional and dropped fields", async () => {
    mocks.upsertProfile.mockResolvedValue({
      id: "profile-1",
      createdAt: new Date("2026-07-14T10:00:00.000Z"),
    });

    const response = await writeProfile(
      new NextRequest("http://localhost/api/profile", {
        method: "POST",
        body: JSON.stringify({ ...colouring, bustCm: 90, waistCm: 65, hipsCm: 90 }),
        headers: { "content-type": "application/json" },
      }),
    );

    expect(response.status).toBe(200);
    const [{ update }] = mocks.upsertProfile.mock.calls[0];
    expect(update).toMatchObject({
      bustCm: 90,
      waistCm: 65,
      hipsCm: 90,
      heightCm: null,
      shouldersCm: null,
      weightKg: null,
      bodyShape: "hourglass",
    });
  });

  it("rejects a partial set of measurements without writing", async () => {
    const response = await writeProfile(
      new NextRequest("http://localhost/api/profile", {
        method: "POST",
        body: JSON.stringify({ ...colouring, heightCm: 170, waistCm: 65 }),
        headers: { "content-type": "application/json" },
      }),
    );

    expect(response.status).toBe(400);
    expect(mocks.upsertProfile).not.toHaveBeenCalled();
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
