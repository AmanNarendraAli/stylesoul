// Checks whether a curated retailer product page is still buyable (M&S only
// for now). Off-sale M&S products either redirect to a category page tagged
// `#intid=offsale-redirect_...` or still return 200 with page data marking
// them off sale, so the HTTP status alone is not enough.

export type ProductPageState =
  | "on_sale"
  | "off_sale"
  | "redirected_offsale"
  | "not_a_product";

export type ProductPage = {
  state: ProductPageState;
  title?: string;
  /** Lowest current GBP price across in-stock sizes. */
  price?: number;
  /** Names of colour variants with stock. */
  colours?: string[];
};

export type ProductUrlCheck = ProductPage & {
  finalUrl: string;
  httpStatus: number;
};

export const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

const MAX_REDIRECTS = 5;

type NextData = {
  props?: {
    pageProps?: {
      isOffSale?: boolean;
      productDetails?: {
        name?: string;
        attributes?: { masterProductDescription?: string };
        countriesData?: { gb?: { saleable?: boolean } };
        variants?: Array<{
          colour?: string;
          skus?: Array<{
            inventory?: { quantity?: number };
            price?: { currentPrice?: number };
          }>;
        }>;
      } | null;
    };
  };
};

export function parseProductPage(html: string, finalUrl: string): ProductPage {
  if (finalUrl.includes("offsale-redirect")) {
    return { state: "redirected_offsale" };
  }

  const pageProps = readNextData(html)?.props?.pageProps;
  const product = pageProps?.productDetails;
  if (!product) return { state: "not_a_product" };

  const title =
    product.name || product.attributes?.masterProductDescription || undefined;
  const inStock = (product.variants ?? [])
    .map((variant) => ({
      colour: variant.colour,
      skus: (variant.skus ?? []).filter(
        (sku) => (sku.inventory?.quantity ?? 0) > 0,
      ),
    }))
    .filter((variant) => variant.skus.length > 0);

  if (
    pageProps.isOffSale === true ||
    product.countriesData?.gb?.saleable === false ||
    inStock.length === 0
  ) {
    return { state: "off_sale", title };
  }

  const prices = inStock.flatMap((variant) =>
    variant.skus.flatMap((sku) => sku.price?.currentPrice ?? []),
  );
  return {
    state: "on_sale",
    title,
    price: prices.length > 0 ? Math.min(...prices) : undefined,
    colours: inStock.flatMap((variant) => variant.colour ?? []),
  };
}

export async function checkProductUrl(
  url: string,
  fetchImpl: typeof fetch = fetch,
): Promise<ProductUrlCheck> {
  let currentUrl = url;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    // Redirects are followed by hand because fetch drops URL fragments, and
    // the off-sale marker lives in the fragment.
    const response = await fetchImpl(currentUrl, {
      redirect: "manual",
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-GB,en;q=0.9",
      },
    });
    const location = response.headers.get("location");
    if (response.status >= 300 && response.status < 400 && location) {
      await response.body?.cancel();
      currentUrl = new URL(location, currentUrl).href;
      continue;
    }

    return {
      ...parseProductPage(await response.text(), currentUrl),
      finalUrl: currentUrl,
      httpStatus: response.status,
    };
  }
  throw new Error(`Too many redirects from ${url}`);
}

function readNextData(html: string): NextData | undefined {
  const match = html.match(
    /<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/,
  );
  if (!match) return undefined;
  try {
    return JSON.parse(match[1]) as NextData;
  } catch {
    return undefined;
  }
}
