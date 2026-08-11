import type { ReactNode } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  signInWithGoogle: vi.fn(),
}));

vi.mock("@/app/signin/actions", () => ({
  signInWithGoogle: mocks.signInWithGoogle,
}));
vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

import SignInPage from "@/app/signin/page";

afterEach(cleanup);

describe("sign-in page", () => {
  it("offers Google OAuth instead of magic-link authentication", async () => {
    render(await SignInPage({ searchParams: Promise.resolve({}) }));

    expect(
      screen.getByRole("button", { name: "Continue with Google" }),
    ).toBeTruthy();
    expect(screen.queryByRole("textbox", { name: "Email" })).toBeNull();
    expect(screen.queryByText(/magic link/i)).toBeNull();
  });

  it("explains when Google OAuth cannot be completed", async () => {
    render(
      await SignInPage({ searchParams: Promise.resolve({ error: "oauth" }) }),
    );

    expect(screen.getByRole("alert").textContent).toBe(
      "Google sign-in could not be completed. Try again.",
    );
  });
});
