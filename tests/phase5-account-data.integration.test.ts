import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  transaction: vi.fn(),
  findUser: vi.fn(),
  deleteUsers: vi.fn(),
  findRateLimit: vi.fn(),
  deleteRateLimits: vi.fn(),
  markAccountDeleting: vi.fn(),
}));

const transactionClient = {
  user: { deleteMany: mocks.deleteUsers },
  analysisRateLimit: { deleteMany: mocks.deleteRateLimits },
};

vi.mock("@/lib/db/prisma", () => ({
  prisma: {
    $transaction: mocks.transaction,
    user: {
      findUnique: mocks.findUser,
      deleteMany: mocks.deleteUsers,
    },
    analysisRateLimit: {
      findUnique: mocks.findRateLimit,
      deleteMany: mocks.deleteRateLimits,
    },
  },
}));
vi.mock("@/lib/server/account-lifecycle", () => ({
  markAccountDeleting: mocks.markAccountDeleting,
}));

import {
  buildAccountExport,
  deleteAccountDatabaseData,
} from "@/lib/server/account-data";

beforeEach(() => {
  vi.clearAllMocks();
  mocks.transaction.mockImplementation(
    (
      operation:
        | Promise<unknown>[]
        | ((transaction: typeof transactionClient) => Promise<unknown>),
    ) =>
      Array.isArray(operation)
        ? Promise.all(operation)
        : operation(transactionClient),
  );
  mocks.markAccountDeleting.mockResolvedValue({ userIdHash: "hash" });
});

describe("account data service", () => {
  it("exports profile, edits, funnel events, rate limits, and retained audits", async () => {
    const account = {
      id: "user-1",
      email: "person@example.com",
      profile: { bodyShape: "hourglass", colourSeason: "warm_spring" },
      weeklyEdits: [
        {
          weekStart: new Date("2026-07-13T00:00:00.000Z"),
          items: [{ position: 0, product: { title: "Dress" } }],
        },
      ],
      funnelEvents: [
        {
          name: "analysis_complete",
          createdAt: new Date("2026-07-14T10:30:00.000Z"),
        },
      ],
      catalogueAuditLogs: [{ action: "update", productId: "product-1" }],
    };
    const rateLimit = {
      requestCount: 2,
      windowStart: new Date("2026-07-14T10:00:00.000Z"),
    };
    mocks.findUser.mockResolvedValue(account);
    mocks.findRateLimit.mockResolvedValue(rateLimit);

    const result = await buildAccountExport({
      id: "user-1",
      email: "person@example.com",
      phone: null,
      createdAt: "2026-07-01T00:00:00.000Z",
      updatedAt: null,
      lastSignInAt: null,
      appMetadata: {},
      userMetadata: {},
    });

    expect(result).toMatchObject({
      format: "stylesoul-account-export",
      version: 1,
      authentication: { id: "user-1", email: "person@example.com" },
      account,
      analysisRateLimit: rateLimit,
    });
    expect(mocks.findUser).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "user-1" },
        select: expect.objectContaining({
          profile: true,
          weeklyEdits: expect.any(Object),
          funnelEvents: expect.any(Object),
          catalogueAuditLogs: expect.any(Object),
        }),
      }),
    );
    expect(mocks.findRateLimit).toHaveBeenCalledWith(
      expect.objectContaining({ where: { userId: "user-1" } }),
    );
  });

  it("deletes unlinked rate-limit metadata and the cascading account row atomically", async () => {
    mocks.deleteRateLimits.mockResolvedValue({ count: 1 });
    mocks.deleteUsers.mockResolvedValue({ count: 1 });

    const result = await deleteAccountDatabaseData("user-1");

    expect(result).toEqual({
      deletedAccountRows: 1,
      deletedRateLimitRows: 1,
    });
    expect(mocks.markAccountDeleting).toHaveBeenCalledWith(
      transactionClient,
      "user-1",
    );
    expect(mocks.markAccountDeleting.mock.invocationCallOrder[0]).toBeLessThan(
      mocks.deleteRateLimits.mock.invocationCallOrder[0],
    );
    expect(mocks.deleteRateLimits).toHaveBeenCalledWith({
      where: { userId: "user-1" },
    });
    expect(mocks.deleteUsers).toHaveBeenCalledWith({ where: { id: "user-1" } });
    expect(mocks.transaction).toHaveBeenCalledOnce();
  });

  it("is idempotent when the database rows are already absent", async () => {
    mocks.deleteRateLimits.mockResolvedValue({ count: 0 });
    mocks.deleteUsers.mockResolvedValue({ count: 0 });

    await expect(deleteAccountDatabaseData("user-1")).resolves.toEqual({
      deletedAccountRows: 0,
      deletedRateLimitRows: 0,
    });
  });

  it("does not delete rows when the lifecycle guard cannot be established", async () => {
    const guardError = new Error("Guard unavailable");
    mocks.markAccountDeleting.mockRejectedValue(guardError);

    await expect(deleteAccountDatabaseData("user-1")).rejects.toBe(guardError);
    expect(mocks.deleteRateLimits).not.toHaveBeenCalled();
    expect(mocks.deleteUsers).not.toHaveBeenCalled();
  });
});
