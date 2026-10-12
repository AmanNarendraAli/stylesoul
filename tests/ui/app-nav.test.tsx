import type { ReactNode } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ pathname: "/products" }));

vi.mock("next/navigation", () => ({ usePathname: () => mocks.pathname }));
vi.mock("next/link", () => ({
  default: ({ children, ...props }: { href: string; children: ReactNode }) => (
    <a {...props}>{children}</a>
  ),
}));

import { NavLinks } from "@/app/(app)/NavLinks";

afterEach(cleanup);

describe("app navigation", () => {
  it("marks the current page", () => {
    mocks.pathname = "/profile";
    render(<NavLinks />);

    expect(
      screen.getByRole("link", { name: "Profile" }).getAttribute("aria-current"),
    ).toBe("page");
    expect(
      screen.getByRole("link", { name: "This week" }).getAttribute("aria-current"),
    ).toBeNull();
    expect(
      screen.getByRole("link", { name: "Account" }).getAttribute("href"),
    ).toBe("/account");
  });
});
