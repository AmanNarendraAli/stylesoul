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

  it("carries a safe next path through the OAuth callback URL only", async () => {
    const form = new FormData();
    form.set("next", "/products");
    await signInWithGoogle(form);

    expect(mocks.signInWithOAuth).toHaveBeenLastCalledWith({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback?next=%2Fproducts",
      },
    });

    form.set("next", "https://evil.example");
    await signInWithGoogle(form);

    expect(mocks.signInWithOAuth).toHaveBeenLastCalledWith({
      provider: "google",
      options: { redirectTo: "http://localhost:3000/auth/callback" },
    });
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
