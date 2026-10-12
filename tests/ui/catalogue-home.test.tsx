import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

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

    fireEvent.click(screen.getByRole("button", { name: /^Ascending/ }));
    expect(productTitles()).toEqual(["Alpha coat", "Zeta dress"]);
    expect(screen.getByRole("button", { name: /^Descending/ })).toBeTruthy();
  });

  it("renders sorted products in pages of 24 behind a show-more button", () => {
    const many = Array.from({ length: 50 }, (_, index) => ({
      ...products[0],
      id: `p${index}`,
      title: `Item ${String(index).padStart(2, "0")}`,
      productUrl: `https://shop.example.com/${index}`,
    }));
    render(<ProductCatalogue products={many} />);

    expect(productTitles()).toHaveLength(24);
    expect(productTitles()[0]).toBe("Item 00");

    fireEvent.click(screen.getByRole("button", { name: /^Ascending/ }));
    expect(productTitles()).toHaveLength(24);
    expect(productTitles()[0]).toBe("Item 49");

    fireEvent.click(screen.getByRole("button", { name: "Show more" }));
    expect(productTitles()).toHaveLength(48);
    fireEvent.click(screen.getByRole("button", { name: "Show more" }));
    expect(productTitles()).toHaveLength(50);
    expect(productTitles().at(-1)).toBe("Item 00");
    expect(screen.queryByRole("button", { name: "Show more" })).toBeNull();
  });
});

describe("catalogue filters", () => {
  it("shows only pieces that suit the profile by default and can show everything", () => {
    render(
      <ProductCatalogue products={products} season="warm_autumn" shape="triangle" />,
    );

    const toggle = screen.getByRole("checkbox", { name: "Only pieces that suit me" });
    expect((toggle as HTMLInputElement).checked).toBe(true);
    expect(productTitles()).toEqual(["Zeta dress"]);
    expect(screen.getByText("Suits your colours")).toBeTruthy();
    expect(screen.getByText("Suits your shape")).toBeTruthy();

    fireEvent.click(toggle);
    expect(productTitles()).toEqual(["Alpha coat", "Zeta dress"]);
  });

  it("matches on season alone when the profile has no shape", () => {
    render(
      <ProductCatalogue
        products={[...products, { ...products[1], id: "beta", title: "Beta coat", eligibleSeasons: ["warm_autumn"] }]}
        season="warm_autumn"
        shape={null}
      />,
    );

    expect(productTitles()).toEqual(["Beta coat", "Zeta dress"]);
    expect(screen.queryByText("Suits your shape")).toBeNull();
  });

  it("hides the suitability toggle without a profile", () => {
    render(<ProductCatalogue products={products} />);

    expect(screen.queryByRole("checkbox")).toBeNull();
    expect(screen.queryByText("Suits your colours")).toBeNull();
  });

  it("filters by garment category", () => {
    render(<ProductCatalogue products={products} />);

    fireEvent.change(screen.getByRole("combobox", { name: "Category" }), {
      target: { value: "outerwear" },
    });
    expect(productTitles()).toEqual(["Alpha coat"]);
  });

  it("explains an empty catalogue", () => {
    render(<ProductCatalogue products={[]} />);

    expect(screen.getByText("Nothing here yet")).toBeTruthy();
  });
});

function productTitles() {
  return within(screen.getByRole("list", { name: "Product catalogue" }))
    .getAllByRole("heading", { level: 3 })
    .map((heading) => heading.textContent);
}
