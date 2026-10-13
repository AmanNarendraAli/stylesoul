import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ProductCard } from "@/components/recommendations/ProductCard";

const product = {
  id: "product-1",
  brand: "Alpha Studio",
  title: "Linen shirt",
  description: null,
  imageUrl: "https://images.example.com/shirt.jpg",
  productUrl: "https://shop.example.com/shirt",
  priceCents: 4500,
  currency: "INR",
  garmentCategory: "tops",
  priceTier: "mid",
};

afterEach(cleanup);

describe("weekly edit product card", () => {
  it("names the product image and the season it suits", () => {
    render(<ProductCard product={product} season="soft_autumn" />);

    expect(screen.getByRole("img", { name: "Linen shirt" })).toBeTruthy();
    expect(screen.getByText("Suits Soft autumn")).toBeTruthy();
  });

  it("shows the price in rupees and up to two reasons it suits you", () => {
    render(
      <ProductCard
        product={{ ...product, priceCents: 249900 }}
        season="soft_autumn"
        reasons={["V neck for your face", "Gold suits your colouring", "Crisp fabric for your face"]}
      />,
    );

    expect(screen.getByText("₹2,499")).toBeTruthy();
    expect(screen.getByText("V neck for your face")).toBeTruthy();
    expect(screen.getByText("Gold suits your colouring")).toBeTruthy();
    expect(screen.queryByText("Crisp fabric for your face")).toBeNull();
  });

  it("leaves out the season chip when the season is unknown", () => {
    render(<ProductCard product={product} season={null} />);

    expect(screen.queryByText(/^Suits/)).toBeNull();
  });
});
