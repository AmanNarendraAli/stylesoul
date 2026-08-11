// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createClient: vi.fn(),
  signInWithOAuth: vi.fn(),
  redirect: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: mocks.createClient,
}));
vi.mock("next/navigation", () => ({ redirect: mocks.redirect }));

import { signInWithGoogle } from "@/app/signin/actions";

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3000");
  mocks.createClient.mockResolvedValue({
    auth: { signInWithOAuth: mocks.signInWithOAuth },
  });
  mocks.signInWithOAuth.mockResolvedValue({
    data: { url: "https://accounts.google.com/o/oauth2/auth?state=test" },
    error: null,
  });
});

describe("Google sign-in action", () => {
  it("starts Google OAuth with the local callback URL", async () => {
    await signInWithGoogle();

    expect(mocks.signInWithOAuth).toHaveBeenCalledWith({
      provider: "google",
      options: { redirectTo: "http://localhost:3000/auth/callback" },
    });
    expect(mocks.redirect).toHaveBeenCalledWith(
      "https://accounts.google.com/o/oauth2/auth?state=test",
    );
  });

  it("returns to sign-in when Supabase cannot create an OAuth URL", async () => {
    mocks.signInWithOAuth.mockResolvedValueOnce({
      data: { url: null },
      error: new Error("Google provider is disabled"),
    });

    await signInWithGoogle();

    expect(mocks.redirect).toHaveBeenCalledWith("/signin?error=oauth");
  });
});
