// @vitest-environment node
import { describe, expect, it, vi } from "vitest";
import { checkProductUrl, parseProductJson } from "@/lib/catalogue/liveness";

const PRODUCT_URL = "https://okhai.org/products/dabu-cotton-ajrakh-kurta-pant-set";
const VARIANT_URL = "https://www.janasya.com/products/navy-a-line-kurta?variant=22";

const product = (variants: Array<{ id: number; available: boolean; price: number }>) =>
  JSON.stringify({ title: "Dabu Cotton Ajrakh Kurta Pant Set", variants });

describe("parseProductJson", () => {
  it("reads the title and the lowest available price in rupees", () => {
    const body = product([
      { id: 11, available: true, price: 720000 },
      { id: 12, available: true, price: 650000 },
      { id: 13, available: false, price: 500000 },
    ]);

    expect(parseProductJson(body, PRODUCT_URL)).toEqual({
      state: "on_sale",
      title: "Dabu Cotton Ajrakh Kurta Pant Set",
      price: 6500,
    });
  });

  it("is off sale once no variant is available", () => {
    const body = product([{ id: 11, available: false, price: 720000 }]);

    expect(parseProductJson(body, PRODUCT_URL).state).toBe("off_sale");
  });

  it("checks only the variant pinned in the product URL", () => {
    const body = product([
      { id: 21, available: true, price: 129900 },
      { id: 22, available: false, price: 129900 },
    ]);

    expect(parseProductJson(body, VARIANT_URL).state).toBe("off_sale");
    expect(parseProductJson(body, VARIANT_URL.replace("=22", "=21")).state).toBe("on_sale");
  });

  it("reports responses without product data as not a product", () => {
    expect(parseProductJson("<html>Access denied</html>", PRODUCT_URL).state).toBe(
      "not_a_product",
    );
    expect(parseProductJson("{}", PRODUCT_URL).state).toBe("not_a_product");
  });
});

describe("checkProductUrl", () => {
  it("fetches the product's .js data without the query string", async () => {
    const fetchImpl = vi.fn(
      async () => new Response(product([{ id: 22, available: true, price: 129900 }])),
    );

    await expect(checkProductUrl(VARIANT_URL, fetchImpl)).resolves.toEqual({
      state: "on_sale",
      title: "Dabu Cotton Ajrakh Kurta Pant Set",
      price: 1299,
      httpStatus: 200,
    });
    expect(fetchImpl).toHaveBeenCalledWith(
      "https://www.janasya.com/products/navy-a-line-kurta.js",
      expect.anything(),
    );
  });

  it("treats a 404 as a removed product", async () => {
    const fetchImpl = vi.fn(async () => new Response("Not found", { status: 404 }));

    await expect(checkProductUrl(PRODUCT_URL, fetchImpl)).resolves.toEqual({
      state: "not_found",
      httpStatus: 404,
    });
  });
});
