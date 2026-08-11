import "server-only";

import type { Prisma } from "@prisma/client";
import { bodyShapes } from "@/lib/body-shape/classify";
import { colourSeasons } from "@/lib/colour-season/map";
import { prisma } from "@/lib/db/prisma";
import { assertAccountWritable } from "@/lib/server/account-lifecycle";
import type {
  ProductInput,
  ProductUpdate,
} from "@/lib/catalogue/schema";

export type CatalogueActor = { id: string; email: string };

export function listCatalogueProducts() {
  return prisma.product.findMany({ orderBy: [{ status: "asc" }, { updatedAt: "desc" }] });
}

export function listActiveCatalogueProducts() {
  return prisma.product.findMany({
    where: { status: "active" },
    orderBy: [{ title: "asc" }, { brand: "asc" }],
    select: {
      id: true,
      brand: true,
      title: true,
      description: true,
      imageUrl: true,
      productUrl: true,
      priceCents: true,
      currency: true,
      eligibleShapes: true,
      eligibleSeasons: true,
      garmentCategory: true,
      priceTier: true,
    },
  });
}

export async function catalogueCoverage() {
  const products = await prisma.product.findMany({
    where: { status: "active" },
    select: { eligibleShapes: true, eligibleSeasons: true },
  });

  return bodyShapes.flatMap((shape) =>
    colourSeasons.map((season) => ({
      shape,
      season,
      count: products.filter(
        (product) =>
          product.eligibleShapes.includes(shape) &&
          product.eligibleSeasons.includes(season),
      ).length,
    })),
  );
}

export function createCatalogueProduct(
  actor: CatalogueActor,
  input: ProductInput,
) {
  return prisma.$transaction(async (transaction) => {
    await ensureActor(transaction, actor);
    const product = await transaction.product.create({
      data: { ...input, isAffiliate: false },
    });
    await transaction.catalogueAuditLog.create({
      data: {
        actorUserId: actor.id,
        productId: product.id,
        action: "create",
        changes: toAuditJson(input),
      },
    });
    return product;
  });
}

export function updateCatalogueProduct(
  actor: CatalogueActor,
  productId: string,
  input: ProductUpdate,
) {
  return prisma.$transaction(async (transaction) => {
    await ensureActor(transaction, actor);
    const existing = await transaction.product.findUniqueOrThrow({
      where: { id: productId },
      select: { status: true },
    });
    const product = await transaction.product.update({
      where: { id: productId },
      data: input,
    });
    await transaction.catalogueAuditLog.create({
      data: {
        actorUserId: actor.id,
        productId,
        action:
          existing.status === "active" && input.status === "inactive"
            ? "deactivate"
            : "update",
        changes: toAuditJson(input),
      },
    });
    return product;
  });
}

async function ensureActor(
  transaction: Prisma.TransactionClient,
  actor: CatalogueActor,
) {
  await assertAccountWritable(transaction, actor.id);
  await transaction.user.upsert({
    where: { id: actor.id },
    create: actor,
    update: { email: actor.email },
  });
}

function toAuditJson(input: ProductInput | ProductUpdate) {
  return Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined),
  ) as Prisma.InputJsonObject;
}
