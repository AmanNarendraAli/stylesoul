// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => {
  const transaction = {
    user: { upsert: vi.fn() },
    product: {
      create: vi.fn(),
      findUniqueOrThrow: vi.fn(),
      update: vi.fn(),
    },
    catalogueAuditLog: { create: vi.fn() },
  };
  return {
    transaction,
    runTransaction: vi.fn((callback: (client: typeof transaction) => unknown) =>
      callback(transaction),
    ),
    assertAccountWritable: vi.fn(),
  };
});

vi.mock("@/lib/db/prisma", () => ({
  prisma: {
    $transaction: mocks.runTransaction,
  },
}));
vi.mock("@/lib/server/account-lifecycle", () => ({
  assertAccountWritable: mocks.assertAccountWritable,
}));

import {
  createCatalogueProduct,
  updateCatalogueProduct,
} from "@/lib/server/catalogue";

const actor = { id: "admin-1", email: "admin@example.com" };
const input = {
  brand: "Example",
  title: "Blue wrap dress",
  description: "A test product",
  imageUrl: "https://images.example.com/dress.jpg",
  productUrl: "https://shop.example.com/dress",
  priceCents: 8900,
  currency: "GBP" as const,
  status: "active" as const,
  eligibleShapes: ["hourglass" as const],
  eligibleSeasons: ["cool_summer" as const],
  garmentCategory: "dresses" as const,
  occasionTags: ["work" as const],
  priceTier: "mid" as const,
};

beforeEach(() => {
  mocks.assertAccountWritable.mockResolvedValue(undefined);
  mocks.transaction.user.upsert.mockResolvedValue({ id: actor.id });
  mocks.transaction.product.create.mockResolvedValue({ id: "product-1", ...input });
  mocks.transaction.product.findUniqueOrThrow.mockResolvedValue({ status: "active" });
  mocks.transaction.product.update.mockResolvedValue({ id: "product-1", ...input });
  mocks.transaction.catalogueAuditLog.create.mockResolvedValue({ id: "audit-1" });
});

describe("catalogue mutation auditing", () => {
  it("creates the actor, forces direct-link posture, and audits creation", async () => {
    await createCatalogueProduct(actor, input);
    expect(mocks.assertAccountWritable).toHaveBeenCalledWith(
      mocks.transaction,
      actor.id,
    );
    expect(mocks.assertAccountWritable.mock.invocationCallOrder[0]).toBeLessThan(
      mocks.transaction.user.upsert.mock.invocationCallOrder[0],
    );

    expect(mocks.transaction.user.upsert).toHaveBeenCalledWith({
      where: { id: actor.id },
      create: actor,
      update: { email: actor.email },
    });
    expect(mocks.transaction.product.create).toHaveBeenCalledWith({
      data: { ...input, isAffiliate: false },
    });
    expect(mocks.transaction.catalogueAuditLog.create).toHaveBeenCalledWith({
      data: {
        actorUserId: actor.id,
        productId: "product-1",
        action: "create",
        changes: input,
      },
    });
  });

  it("audits only an active-to-inactive transition as deactivation", async () => {
    await updateCatalogueProduct(actor, "product-1", { status: "inactive" });

    expect(mocks.transaction.catalogueAuditLog.create).toHaveBeenLastCalledWith({
      data: {
        actorUserId: actor.id,
        productId: "product-1",
        action: "deactivate",
        changes: { status: "inactive" },
      },
    });

    mocks.transaction.product.findUniqueOrThrow.mockResolvedValueOnce({
      status: "inactive",
    });
    await updateCatalogueProduct(actor, "product-1", { status: "inactive" });

    expect(mocks.transaction.catalogueAuditLog.create).toHaveBeenLastCalledWith({
      data: {
        actorUserId: actor.id,
        productId: "product-1",
        action: "update",
        changes: { status: "inactive" },
      },
    });
  });

  it("does not mutate the catalogue after actor deletion begins", async () => {
    const deletionError = new Error("Account deletion is in progress");
    mocks.assertAccountWritable.mockRejectedValue(deletionError);

    await expect(createCatalogueProduct(actor, input)).rejects.toBe(deletionError);
    expect(mocks.transaction.user.upsert).not.toHaveBeenCalled();
    expect(mocks.transaction.product.create).not.toHaveBeenCalled();
    expect(mocks.transaction.catalogueAuditLog.create).not.toHaveBeenCalled();
  });

});
