// @vitest-environment node
import { Prisma } from "@prisma/client";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  findWeeklyEdit: vi.fn(),
  findProfile: vi.fn(),
  findProducts: vi.fn(),
  findHistory: vi.fn(),
  createWeeklyEdit: vi.fn(),
  transaction: vi.fn(),
  assertAccountWritable: vi.fn(),
}));

const transactionClient = {
  weeklyEdit: {
    findUnique: mocks.findWeeklyEdit,
    create: mocks.createWeeklyEdit,
  },
};

vi.mock("@/lib/db/prisma", () => ({
  prisma: {
    $transaction: mocks.transaction,
    weeklyEdit: {
      findUnique: mocks.findWeeklyEdit,
      create: mocks.createWeeklyEdit,
    },
    styleProfile: { findUnique: mocks.findProfile },
    product: { findMany: mocks.findProducts },
    weeklyEditItem: { findMany: mocks.findHistory },
  },
}));
vi.mock("@/lib/server/account-lifecycle", () => ({
  assertAccountWritable: mocks.assertAccountWritable,
}));

import { getOrCreateWeeklyEditForUser } from "@/lib/server/weekly-edit";

const weekStart = new Date("2026-07-13T00:00:00.000Z");
const products = ["a", "b", "c", "d"].map((id, index) => ({
  id,
  brand: `Brand ${id}`,
  title: `Product ${id}`,
  description: null,
  imageUrl: `https://images.example.com/${id}.jpg`,
  productUrl: `https://shop.example.com/${id}`,
  isAffiliate: false,
  priceCents: 5000 + index * 1000,
  currency: "GBP",
  status: "active",
  eligibleShapes: ["hourglass"],
  eligibleSeasons: ["warm_spring"],
  garmentCategory: "dresses",
  occasionTags: ["work"],
  priceTier: ["entry", "mid", "premium", "mid"][index],
  createdAt: new Date(),
  updatedAt: new Date(),
}));

beforeEach(() => {
  mocks.transaction.mockImplementation(
    (
      operation: (transaction: typeof transactionClient) => Promise<unknown>,
    ) => operation(transactionClient),
  );
  mocks.assertAccountWritable.mockResolvedValue(undefined);
  mocks.findWeeklyEdit.mockResolvedValue(null);
  mocks.findProfile.mockResolvedValue({
    bodyShape: "hourglass",
    colourSeason: "warm_spring",
  });
  mocks.findProducts.mockResolvedValue(products);
  mocks.findHistory.mockResolvedValue([]);
  mocks.createWeeklyEdit.mockImplementation(({ data }) =>
    Promise.resolve({
      id: "edit-1",
      userId: data.userId,
      weekStart: data.weekStart,
      items: data.items.create,
    }),
  );
});

describe("weekly edit persistence", () => {
  it("returns the same cached edit without recomputing", async () => {
    const cached = { id: "edit-existing", weekStart, items: [] };
    mocks.findWeeklyEdit.mockResolvedValue(cached);

    const result = await getOrCreateWeeklyEditForUser(
      "user-1",
      new Date("2026-07-15T12:00:00.000Z"),
    );

    expect(result).toBe(cached);
    expect(mocks.findProducts).not.toHaveBeenCalled();
    expect(mocks.createWeeklyEdit).not.toHaveBeenCalled();
  });

  it("creates three ordered relational items and queries eight weeks of history", async () => {
    mocks.findHistory.mockResolvedValue([{ productId: "a" }]);

    await getOrCreateWeeklyEditForUser(
      "user-1",
      new Date("2026-07-15T12:00:00.000Z"),
    );

    expect(mocks.findHistory).toHaveBeenCalledWith({
      where: {
        weeklyEdit: {
          userId: "user-1",
          weekStart: {
            gte: new Date("2026-05-18T00:00:00.000Z"),
            lt: weekStart,
          },
        },
      },
      select: { productId: true },
    });
    const create = mocks.createWeeklyEdit.mock.calls[0][0];
    expect(create.data.userId).toBe("user-1");
    expect(create.data.weekStart).toEqual(weekStart);
    expect(mocks.assertAccountWritable).toHaveBeenCalledWith(
      transactionClient,
      "user-1",
    );
    expect(
      mocks.assertAccountWritable.mock.invocationCallOrder[0],
    ).toBeLessThan(mocks.createWeeklyEdit.mock.invocationCallOrder[0]);
    expect(create.data.items.create).toHaveLength(3);
    expect(create.data.items.create.map(({ position }: { position: number }) => position)).toEqual([
      0, 1, 2,
    ]);
    expect(
      new Set(create.data.items.create.map(({ productId }: { productId: string }) => productId)).size,
    ).toBe(3);
  });

  it("returns the winning cache row after a concurrent unique-key race", async () => {
    const winner = { id: "edit-winner", weekStart, items: [] };
    mocks.findWeeklyEdit
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(winner);
    mocks.createWeeklyEdit.mockRejectedValueOnce(
      new Prisma.PrismaClientKnownRequestError("Unique constraint", {
        code: "P2002",
        clientVersion: "6.19.3",
      }),
    );

    const result = await getOrCreateWeeklyEditForUser(
      "user-1",
      new Date("2026-07-15T12:00:00.000Z"),
    );

    expect(result).toBe(winner);
    expect(mocks.findWeeklyEdit).toHaveBeenCalledTimes(3);
  });

  it("does not create an edit after account deletion begins", async () => {
    const deletionError = new Error("Account deletion is in progress");
    mocks.assertAccountWritable.mockRejectedValueOnce(deletionError);

    await expect(
      getOrCreateWeeklyEditForUser(
        "user-1",
        new Date("2026-07-15T12:00:00.000Z"),
      ),
    ).rejects.toBe(deletionError);

    expect(mocks.createWeeklyEdit).not.toHaveBeenCalled();
    expect(mocks.findWeeklyEdit).toHaveBeenCalledOnce();
  });
});
