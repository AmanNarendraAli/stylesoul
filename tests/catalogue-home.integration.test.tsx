import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/components/avatar/Avatar", () => ({
  Avatar: ({ shape }: { shape: string }) => <span>{shape}</span>,
}));

import {
  ProductCatalogue,
  type CatalogueProduct,
} from "@/components/catalogue/ProductCatalogue";

const products: CatalogueProduct[] = [
  {
    id: "zeta",
    brand: "Alpha Studio",
    title: "Zeta dress",
    description: null,
    imageUrl: "https://images.example.com/zeta.jpg",
    productUrl: "https://shop.example.com/zeta",
    priceCents: 2500,
    currency: "GBP",
    eligibleShapes: ["triangle"],
    eligibleSeasons: ["warm_autumn"],
    garmentCategory: "dresses",
    priceTier: "entry",
  },
  {
    id: "alpha",
    brand: "Zed Atelier",
    title: "Alpha coat",
    description: null,
    imageUrl: "https://images.example.com/alpha.jpg",
    productUrl: "https://shop.example.com/alpha",
    priceCents: 9900,
    currency: "GBP",
    eligibleShapes: ["hourglass"],
    eligibleSeasons: ["cool_winter"],
    garmentCategory: "outerwear",
    priceTier: "premium",
  },
];

afterEach(cleanup);

describe("signed-in product catalogue", () => {
  it("sorts alphabetically by default and supports price direction toggling", () => {
    render(<ProductCatalogue products={products} />);

    expect(productTitles()).toEqual(["Alpha coat", "Zeta dress"]);

    fireEvent.change(screen.getByRole("combobox", { name: "Sort products by" }), {
      target: { value: "price" },
    });
    expect(productTitles()).toEqual(["Zeta dress", "Alpha coat"]);

    fireEvent.click(screen.getByRole("button", { name: "Sort descending" }));
    expect(productTitles()).toEqual(["Alpha coat", "Zeta dress"]);
    expect(screen.getByRole("button", { name: "Sort ascending" })).toBeTruthy();
  });

  it("offers every requested sort category and exposes silhouette labels", () => {
    render(<ProductCatalogue products={products} />);

    const select = screen.getByRole("combobox", { name: "Sort products by" });
    expect(within(select).getByRole("option", { name: "Alphabetical" })).toBeTruthy();
    expect(within(select).getByRole("option", { name: "Designer / provider" })).toBeTruthy();
    expect(within(select).getByRole("option", { name: "Silhouette" })).toBeTruthy();
    expect(within(select).getByRole("option", { name: "Colour season" })).toBeTruthy();
    expect(within(select).getByRole("option", { name: "Price" })).toBeTruthy();
    expect(screen.getByText("Hourglass")).toBeTruthy();
    expect(screen.getByText("Triangle")).toBeTruthy();
  });
});

function productTitles() {
  return within(screen.getByRole("list", { name: "Product catalogue" }))
    .getAllByRole("heading", { level: 3 })
    .map((heading) => heading.textContent);
}
