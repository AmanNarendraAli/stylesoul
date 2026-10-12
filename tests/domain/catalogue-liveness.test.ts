// @vitest-environment node
import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { checkProductUrl, parseProductPage } from "@/lib/catalogue/liveness";

const fixture = (name: string) =>
  readFileSync(
    new URL(`../fixtures/catalogue/${name}.html`, import.meta.url),
    "utf8",
  );

const PRODUCT_URL =
  "https://www.marksandspencer.com/pure-cotton-longline-trench-coat/p/clp60779115";
const OFFSALE_URL =
  "https://www.marksandspencer.com/l/women/dresses/mini-dresses#intid=offsale-redirect_P60786449_T429872W";

describe("parseProductPage", () => {
  it("reads an on-sale product's title, lowest price and in-stock colours", () => {
    expect(parseProductPage(fixture("ms-on-sale"), PRODUCT_URL)).toEqual({
      state: "on_sale",
      title: "The Trench",
      price: 95,
      colours: ["LIGHT CARAMEL", "BLACK"],
    });
  });

  it("treats a 200 product page flagged off sale as off sale", () => {
    expect(parseProductPage(fixture("ms-off-sale"), PRODUCT_URL)).toEqual({
      state: "off_sale",
      title: "Pure Cotton Lace Insert Beach Dresses",
    });
  });

  it("lists only colours with stock, and is off sale once nothing is in stock", () => {
    const soldOut = (colours: string[]) =>
      fixture("ms-on-sale").replace(
        /"colour": "([^"]+)",\s*"skus": \[[\s\S]*?\n {6}\]/g,
        (variant, colour: string) =>
          colours.includes(colour)
            ? variant.replace(/"quantity": \d+/g, '"quantity": 0')
            : variant,
      );

    expect(parseProductPage(soldOut(["BLACK"]), PRODUCT_URL)).toMatchObject({
      state: "on_sale",
      colours: ["LIGHT CARAMEL"],
    });
    expect(
      parseProductPage(soldOut(["BLACK", "LIGHT CARAMEL"]), PRODUCT_URL).state,
    ).toBe("off_sale");
  });

  it("recognises the off-sale redirect marker in the final URL", () => {
    expect(parseProductPage(fixture("ms-category"), OFFSALE_URL)).toEqual({
      state: "redirected_offsale",
    });
  });

  it("reports pages without product data as not a product", () => {
    const categoryUrl = OFFSALE_URL.split("#")[0];
    expect(parseProductPage(fixture("ms-category"), categoryUrl).state).toBe(
      "not_a_product",
    );
    expect(parseProductPage("<html>Access denied</html>", PRODUCT_URL).state).toBe(
      "not_a_product",
    );
  });
});

describe("checkProductUrl", () => {
  it("returns the parsed page with its final URL and status", async () => {
    const fetchImpl = vi.fn(async () => new Response(fixture("ms-on-sale")));

    await expect(checkProductUrl(PRODUCT_URL, fetchImpl)).resolves.toMatchObject({
      state: "on_sale",
      title: "The Trench",
      finalUrl: PRODUCT_URL,
      httpStatus: 200,
    });
  });

  it("follows redirects and keeps the off-sale marker from the Location header", async () => {
    const fetchImpl = vi.fn(async (input: RequestInfo | URL) =>
      String(input) === PRODUCT_URL
        ? new Response(null, {
            status: 308,
            headers: {
              location:
                "/l/women/dresses/mini-dresses#intid=offsale-redirect_P60786449_T429872W",
            },
          })
        : new Response(fixture("ms-category")),
    );

    await expect(checkProductUrl(PRODUCT_URL, fetchImpl)).resolves.toEqual({
      state: "redirected_offsale",
      finalUrl: OFFSALE_URL,
      httpStatus: 200,
    });
  });

  it("detects an off-sale product reached through a redirect", async () => {
    const movedUrl =
      "https://www.marksandspencer.com/textured-round-neck-midi-bodycon-dress/p/clp61225770";
    const fetchImpl = vi.fn(async (input: RequestInfo | URL) =>
      String(input) === PRODUCT_URL
        ? new Response(null, { status: 308, headers: { location: movedUrl } })
        : new Response(fixture("ms-off-sale")),
    );

    await expect(checkProductUrl(PRODUCT_URL, fetchImpl)).resolves.toMatchObject({
      state: "off_sale",
      finalUrl: movedUrl,
    });
  });
});
