import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getAuthenticatedUserState: vi.fn(),
  redirect: vi.fn(),
}));

vi.mock("@/lib/server/auth", () => ({
  getAuthenticatedUserState: mocks.getAuthenticatedUserState,
}));
vi.mock("next/navigation", () => ({ redirect: mocks.redirect }));

import MarketingPage from "@/app/(marketing)/page";

afterEach(cleanup);

beforeEach(() => {
  mocks.getAuthenticatedUserState.mockResolvedValue({
    available: true,
    user: null,
  });
});

describe("home routing", () => {
  it("sends signed-in visitors to the product catalogue", async () => {
    mocks.getAuthenticatedUserState.mockResolvedValueOnce({
      available: true,
      user: { id: "user-1" },
    });

    await MarketingPage({ searchParams: Promise.resolve({}) });

    expect(mocks.redirect).toHaveBeenCalledWith("/products");
  });

  it("keeps the marketing homepage for signed-out visitors", async () => {
    await MarketingPage({ searchParams: Promise.resolve({}) });

    expect(mocks.redirect).not.toHaveBeenCalled();
  });

  it("shows the sign-up steps and an example profile without a pricing page", async () => {
    render(await MarketingPage({ searchParams: Promise.resolve({}) }));

    expect(
      screen.getByRole("link", { name: "Create your profile" }).getAttribute("href"),
    ).toBe("/signin");
    expect(screen.getAllByRole("listitem").length).toBeGreaterThanOrEqual(3);
    expect(screen.getByRole("complementary", { name: "Example profile" })).toBeTruthy();
    expect(
      screen.queryAllByRole("link").some((link) => link.getAttribute("href") === "/pricing"),
    ).toBe(false);
  });

  it("confirms an account deletion on the signed-out homepage", async () => {
    render(await MarketingPage({ searchParams: Promise.resolve({ deleted: "1" }) }));

    expect(screen.getByRole("status")).toBeTruthy();
  });
});
