// Checks that catalogue products are still buyable and their images load.
//   npm run catalogue:check              active products in the database
//   npm run catalogue:check -- --apply   ...and set off-sale ones inactive
//   npm run catalogue:check -- --seed    prisma/catalogue.ts (no database)
import { PrismaClient } from "@prisma/client";
import { checkProductUrl, USER_AGENT } from "../lib/catalogue/liveness.ts";
import { normalizePrismaConnectionUrl } from "../lib/db/connection-url.ts";
import { curatedProducts } from "./catalogue.ts";

const MIN_IMAGE_WIDTH = 800;
const REQUEST_GAP_MS = 1000;

type CheckedProduct = { title: string; productUrl: string; imageUrl: string };

const apply = process.argv.includes("--apply");
const fromSeed = process.argv.includes("--seed");
if (apply && fromSeed) {
  console.error("--apply updates the database, so it cannot be used with --seed.");
  process.exit(2);
}

const prisma = fromSeed
  ? undefined
  : new PrismaClient({
      datasourceUrl: normalizePrismaConnectionUrl(
        process.env.DIRECT_URL || process.env.DATABASE_URL,
      ),
    });

try {
  const products: readonly CheckedProduct[] = prisma
    ? await prisma.product.findMany({
        where: { status: "active" },
        select: { title: true, productUrl: true, imageUrl: true },
        orderBy: { title: "asc" },
      })
    : curatedProducts;

  const counts: Record<string, number> = {};
  const offSale: CheckedProduct[] = [];
  let problems = 0;
  const report = (problem: string, product: CheckedProduct, detail: string) => {
    problems += 1;
    console.log(`${problem.padEnd(18)} ${product.title} | ${detail}`);
  };

  for (const [index, product] of products.entries()) {
    if (index > 0) await sleep(REQUEST_GAP_MS);

    let state: string;
    try {
      const result = await checkProductUrl(product.productUrl);
      state = result.state;
      if (state !== "on_sale") {
        report(
          state,
          product,
          result.finalUrl === product.productUrl
            ? `HTTP ${result.httpStatus} ${product.productUrl}`
            : `${product.productUrl} -> ${result.finalUrl}`,
        );
      }
      if (state === "off_sale" || state === "redirected_offsale") {
        offSale.push(product);
      }
    } catch (error) {
      state = "error";
      report(state, product, `${product.productUrl} (${String(error)})`);
    }
    counts[state] = (counts[state] ?? 0) + 1;

    const imageProblem = await checkImage(product.imageUrl);
    if (imageProblem) report("image", product, `${imageProblem} ${product.imageUrl}`);
  }

  console.log(
    `\nChecked ${products.length} ${fromSeed ? "seed" : "active"} products: ` +
      Object.entries(counts)
        .map(([state, count]) => `${count} ${state}`)
        .join(", ") +
      `. ${problems} problem${problems === 1 ? "" : "s"}.`,
  );

  if (apply && prisma) {
    for (const product of offSale) {
      await prisma.product.update({
        where: { productUrl: product.productUrl },
        data: { status: "inactive" },
      });
      console.log(`Set inactive: ${product.title} (${product.productUrl})`);
    }
  }

  if (problems > 0) process.exitCode = 1;
} finally {
  await prisma?.$disconnect();
}

async function checkImage(url: string) {
  const width = Number(url.match(/\/w_(\d+)[,/]/)?.[1]);
  try {
    const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
    await response.body?.cancel();
    const contentType = response.headers.get("content-type") ?? "";
    if (!response.ok || !contentType.startsWith("image/")) {
      return `HTTP ${response.status} ${contentType}`;
    }
  } catch (error) {
    return String(error);
  }
  if (!(width >= MIN_IMAGE_WIDTH)) {
    return `width ${width || "unknown"} < ${MIN_IMAGE_WIDTH}`;
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
