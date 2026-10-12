import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getAuthenticatedUserState: vi.fn(),
  findStyleProfile: vi.fn(),
  getWeeklyEdit: vi.fn(),
  listActiveCatalogueProducts: vi.fn(),
  productCard: vi.fn(),
  productCatalogue: vi.fn(),
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
  ProductCard: (props: { product: { title: string } }) => {
    mocks.productCard(props);
    return <div>{props.product.title}</div>;
  },
}));
vi.mock("@/components/recommendations/FirstEditViewTracker", () => ({
  FirstEditViewTracker: () => <div data-testid="first-edit-view-tracker" />,
}));
vi.mock("@/components/catalogue/ProductCatalogue", () => ({
  ProductCatalogue: (props: unknown) => {
    mocks.productCatalogue(props);
    return <div data-testid="product-catalogue" />;
  },
}));

import ProductsPage from "@/app/(app)/products/page";
import { AccountDeletedError } from "@/lib/server/account-lifecycle";

beforeEach(() => {
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
  mocks.productCard.mockReset();
});

afterEach(() => {
  cleanup();
});

describe("weekly edit funnel milestone", () => {
  it("renders the weekly edit above the catalogue with its view tracker", async () => {
    render(await ProductsPage());

    expect(screen.getByText("Test dress")).toBeTruthy();
    expect(screen.getByTestId("first-edit-view-tracker")).toBeTruthy();
    expect(screen.getByTestId("product-catalogue")).toBeTruthy();
  });

  it("passes the profile season and shape to the edit and catalogue", async () => {
    render(await ProductsPage());

    expect(mocks.productCard).toHaveBeenCalledWith(
      expect.objectContaining({ season: "warm_spring" }),
    );
    expect(mocks.productCatalogue).toHaveBeenCalledWith(
      expect.objectContaining({ season: "warm_spring", shape: "hourglass" }),
    );
    expect(screen.getByText(/your colours and shape\./)).toBeTruthy();
  });

  it("does not mention shape for a profile without a body shape", async () => {
    mocks.findStyleProfile.mockResolvedValueOnce({
      bodyShape: null,
      colourSeason: "warm_spring",
    });

    render(await ProductsPage());

    expect(screen.getByText("Test dress")).toBeTruthy();
    expect(screen.queryByText(/your colours and shape\./)).toBeNull();
    expect(mocks.productCatalogue).toHaveBeenCalledWith(
      expect.objectContaining({ season: "warm_spring", shape: null }),
    );
  });

  it("points to the catalogue when there are too few pieces for an edit", async () => {
    const { InsufficientCatalogueError } = await import("@/lib/server/weekly-edit");
    mocks.getWeeklyEdit.mockRejectedValueOnce(new InsufficientCatalogueError());

    render(await ProductsPage());

    expect(screen.getByText(/catalogue below/)).toBeTruthy();
    expect(screen.getByTestId("product-catalogue")).toBeTruthy();
  });

  it("links a signed-in user without a profile to onboarding", async () => {
    mocks.findStyleProfile.mockResolvedValueOnce(null);

    render(await ProductsPage());

    expect(
      screen
        .getByRole("link", { name: "Start your style profile" })
        .getAttribute("href"),
    ).toBe("/onboarding");
    expect(mocks.getWeeklyEdit).not.toHaveBeenCalled();
  });

  it("keeps the catalogue available when the weekly edit is unavailable", async () => {
    mocks.getWeeklyEdit.mockRejectedValueOnce(new AccountDeletedError());

    render(await ProductsPage());

    expect(screen.queryByTestId("first-edit-view-tracker")).toBeNull();
    expect(screen.getByTestId("product-catalogue")).toBeTruthy();
  });
});
