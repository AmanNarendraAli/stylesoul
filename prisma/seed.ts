import { PrismaClient } from "@prisma/client";
import { normalizePrismaConnectionUrl } from "../lib/db/connection-url.ts";
import { canonicalSeasons, canonicalShapes, curatedProducts } from "./catalogue.ts";
import { reconcileCatalogue } from "./reconcile-catalogue.ts";

process.env.DATABASE_URL = normalizePrismaConnectionUrl(
  process.env.DIRECT_URL ?? process.env.DATABASE_URL,
);

const prisma = new PrismaClient();
try {
  const activeProducts = await reconcileCatalogue(
    prisma.product,
    curatedProducts,
  );
  const bucketCounts = canonicalShapes.flatMap((shape) =>
    canonicalSeasons.map(
      (season) =>
        activeProducts.filter(
          (product) =>
            product.eligibleShapes.includes(shape) &&
            product.eligibleSeasons.includes(season),
        ).length,
    ),
  );
  console.log(
    `Active catalogue: ${activeProducts.length} products, ` +
      `${new Set(activeProducts.map((product) => product.brand)).size} brands, ` +
      `minimum bucket coverage ${Math.min(...bucketCounts)}.`,
  );
  console.log(`Seeded ${curatedProducts.length} curated direct-link products.`);
} finally {
  await prisma.$disconnect();
}

