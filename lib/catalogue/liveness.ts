// Checks whether a curated retailer product is still buyable. Every catalogue
// retailer runs Shopify, which serves a product's data at `<product path>.js`:
// 404 once the product is removed or unpublished, otherwise per-variant
// availability. A `?variant=` in the product URL pins the colour we show, so
// that variant must itself be available.

export type ProductPageState =
  | "on_sale"
  | "off_sale"
  | "not_found"
  | "not_a_product";

export type ProductPage = {
  state: ProductPageState;
  title?: string;
  /** Lowest current price, in rupees, across the available variants checked. */
  price?: number;
};

export type ProductUrlCheck = ProductPage & {
  httpStatus: number;
};

export const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

type ShopifyProduct = {
  title?: string;
  variants?: Array<{ id?: number; available?: boolean; price?: number }>;
};

export function parseProductJson(body: string, productUrl: string): ProductPage {
  let product: ShopifyProduct;
  try {
    product = JSON.parse(body) as ShopifyProduct;
  } catch {
    return { state: "not_a_product" };
  }
  if (!Array.isArray(product.variants)) return { state: "not_a_product" };

  const variantId = new URL(productUrl).searchParams.get("variant");
  const available = product.variants.filter(
    (variant) =>
      variant.available === true &&
      (variantId === null || String(variant.id) === variantId),
  );
  if (available.length === 0) return { state: "off_sale", title: product.title };

  const prices = available.flatMap((variant) => variant.price ?? []);
  return {
    state: "on_sale",
    title: product.title,
    price: prices.length > 0 ? Math.min(...prices) / 100 : undefined,
  };
}

export async function checkProductUrl(
  productUrl: string,
  fetchImpl: typeof fetch = fetch,
): Promise<ProductUrlCheck> {
  const url = new URL(productUrl);
  const response = await fetchImpl(`${url.origin}${url.pathname}.js`, {
    headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
  });
  if (response.status === 404) {
    await response.body?.cancel();
    return { state: "not_found", httpStatus: 404 };
  }
  return {
    ...parseProductJson(await response.text(), productUrl),
    httpStatus: response.status,
  };
}
