import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getUser: vi.fn(),
  logOut: vi.fn(),
  redirect: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => ({
    auth: { getUser: mocks.getUser },
  })),
}));
vi.mock("@/app/(app)/actions", () => ({ logOut: mocks.logOut }));
vi.mock("next/navigation", () => ({ redirect: mocks.redirect }));

import AppLayout from "@/app/(app)/layout";

afterEach(cleanup);

describe("authenticated header", () => {
  it("places Log out alongside the profile navigation", async () => {
    mocks.getUser.mockResolvedValue({ data: { user: { id: "user-1" } } });

    render(await AppLayout({ children: <div>Page content</div> }));

    const navigation = screen.getByRole("navigation");
    expect(within(navigation).getByRole("link", { name: "Profile" })).toBeTruthy();
    expect(within(navigation).getByRole("button", { name: "Log out" })).toBeTruthy();
  });
});
