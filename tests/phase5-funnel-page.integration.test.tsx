import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getAuthenticatedUserState: vi.fn(),
  findStyleProfile: vi.fn(),
  getWeeklyEdit: vi.fn(),
  listActiveCatalogueProducts: vi.fn(),
}));

vi.mock("@/lib/server/auth", () => ({
  getAuthenticatedUserState: mocks.getAuthenticatedUserState,
}));
vi.mock("@/lib/server/profile", () => ({
  findStyleProfile: mocks.findStyleProfile,
}));
vi.mock("@/lib/server/catalogue", () => ({
  listActiveCatalogueProducts: mocks.listActiveCatalogueProducts,
}));
vi.mock("@/lib/server/weekly-edit", () => ({
  getOrCreateWeeklyEditForUser: mocks.getWeeklyEdit,
  InsufficientCatalogueError: class InsufficientCatalogueError extends Error {},
  MissingStyleProfileError: class MissingStyleProfileError extends Error {},
}));
vi.mock("@/components/recommendations/ProductCard", () => ({
  ProductCard: ({ product }: { product: { title: string } }) => (
    <div>{product.title}</div>
  ),
}));
vi.mock("@/components/recommendations/FirstEditViewTracker", () => ({
  FirstEditViewTracker: () => <div data-testid="first-edit-view-tracker" />,
}));
vi.mock("@/components/catalogue/ProductCatalogue", () => ({
  ProductCatalogue: () => <div data-testid="product-catalogue" />,
}));

import ProductsPage from "@/app/(app)/products/page";
import { AccountDeletedError } from "@/lib/server/account-lifecycle";

beforeEach(() => {
  vi.clearAllMocks();
  mocks.getAuthenticatedUserState.mockResolvedValue({
    available: true,
    user: { id: "user-1" },
  });
  mocks.findStyleProfile.mockResolvedValue({
    bodyShape: "hourglass",
    colourSeason: "warm_spring",
  });
  mocks.getWeeklyEdit.mockResolvedValue({
    weekStart: new Date("2026-07-13T00:00:00.000Z"),
    items: [{ product: { id: "product-1", title: "Test dress" } }],
  });
  mocks.listActiveCatalogueProducts.mockResolvedValue([]);
});

afterEach(() => {
  cleanup();
});

describe("weekly edit funnel milestone", () => {
  it("renders the weekly edit above the catalogue with its view tracker", async () => {
    render(await ProductsPage());

    expect(screen.getByRole("heading", { name: "This week's edit" })).toBeTruthy();
    expect(screen.getByText("Test dress")).toBeTruthy();
    expect(screen.getByTestId("first-edit-view-tracker")).toBeTruthy();
    expect(screen.getByTestId("product-catalogue")).toBeTruthy();
  });

  it("keeps the catalogue available when the weekly edit is unavailable", async () => {
    mocks.getWeeklyEdit.mockRejectedValueOnce(new AccountDeletedError());

    render(await ProductsPage());

    expect(screen.getByText("Account deletion is in progress.")).toBeTruthy();
    expect(screen.queryByTestId("first-edit-view-tracker")).toBeNull();
    expect(screen.getByTestId("product-catalogue")).toBeTruthy();
  });
});
