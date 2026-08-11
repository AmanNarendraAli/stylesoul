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

beforeEach(() => {
  vi.clearAllMocks();
  mocks.getAuthenticatedUserState.mockResolvedValue({
    available: true,
    user: null,
  });
});

afterEach(cleanup);

describe("home routing", () => {
  it("sends signed-in visitors to the product catalogue", async () => {
    mocks.getAuthenticatedUserState.mockResolvedValueOnce({
      available: true,
      user: { id: "user-1" },
    });

    await MarketingPage();

    expect(mocks.redirect).toHaveBeenCalledWith("/products");
  });

  it("keeps the marketing homepage for signed-out visitors", async () => {
    render(await MarketingPage());

    expect(mocks.redirect).not.toHaveBeenCalled();
    expect(
      screen.getByRole("heading", {
        name: "A lifelong fashion compass, built around you.",
      }),
    ).toBeTruthy();
  });
});
