import type { CuratedProduct } from "./catalogue";

export const CATALOGUE_SEED_SOURCE = "curated-seed";

type SeededProduct = CuratedProduct & {
  catalogueSource: typeof CATALOGUE_SEED_SOURCE;
};

export type ActiveCatalogueProduct = {
  brand: string;
  eligibleShapes: string[];
  eligibleSeasons: string[];
};

export type ProductSeedRepository = {
  upsert(args: {
    where: { productUrl: string };
    create: SeededProduct;
    update: SeededProduct;
  }): Promise<unknown>;
  updateMany(args: {
    where: {
      catalogueSource: typeof CATALOGUE_SEED_SOURCE;
      productUrl: { notIn: string[] };
    };
    data: { status: "inactive" };
  }): Promise<unknown>;
  findMany(args: {
    where: {
      status: "active";
      catalogueSource: typeof CATALOGUE_SEED_SOURCE;
    };
    select: {
      brand: true;
      eligibleShapes: true;
      eligibleSeasons: true;
    };
  }): Promise<ActiveCatalogueProduct[]>;
};

export async function reconcileCatalogue(
  productRepository: ProductSeedRepository,
  products: readonly CuratedProduct[],
) {
  for (const product of products) {
    const seededProduct = {
      ...product,
      catalogueSource: CATALOGUE_SEED_SOURCE,
    } satisfies SeededProduct;
    await productRepository.upsert({
      where: { productUrl: product.productUrl },
      create: seededProduct,
      update: seededProduct,
    });
  }

  await productRepository.updateMany({
    where: {
      catalogueSource: CATALOGUE_SEED_SOURCE,
      productUrl: {
        notIn: products.map((product) => product.productUrl),
      },
    },
    data: { status: "inactive" },
  });

  return productRepository.findMany({
    where: {
      status: "active",
      catalogueSource: CATALOGUE_SEED_SOURCE,
    },
    select: {
      brand: true,
      eligibleShapes: true,
      eligibleSeasons: true,
    },
  });
}
