import { createHash } from "node:crypto";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  AccountDeletedError,
  assertAccountWritable,
  markAccountDeleting,
} from "@/lib/server/account-lifecycle";

const transaction = {
  $queryRaw: vi.fn(),
  accountDeletionGuard: {
    findUnique: vi.fn(),
    upsert: vi.fn(),
  },
};
const userId = "00000000-0000-4000-8000-000000000123";
const userIdHash = createHash("sha256").update(userId).digest("hex");

beforeEach(() => {
  transaction.$queryRaw.mockResolvedValue([
    { pg_advisory_xact_lock: null },
  ]);
  transaction.accountDeletionGuard.findUnique.mockResolvedValue(null);
  transaction.accountDeletionGuard.upsert.mockResolvedValue({ userIdHash });
});

describe("account lifecycle guard", () => {
  it("serializes a user mutation before checking its pseudonymous tombstone", async () => {
    await assertAccountWritable(transaction as never, userId);

    const [query, parameter] = transaction.$queryRaw.mock.calls[0];
    expect(query.join(" ")).toContain("pg_advisory_xact_lock");
    expect(parameter).toBe(userId);
    expect(transaction.accountDeletionGuard.findUnique).toHaveBeenCalledWith({
      where: { userIdHash },
      select: { userIdHash: true },
    });
    expect(transaction.$queryRaw.mock.invocationCallOrder[0]).toBeLessThan(
      transaction.accountDeletionGuard.findUnique.mock.invocationCallOrder[0],
    );
  });

  it("rejects every later mutation once deletion is marked", async () => {
    transaction.accountDeletionGuard.findUnique.mockResolvedValue({
      userIdHash,
    });

    await expect(
      assertAccountWritable(transaction as never, userId),
    ).rejects.toBeInstanceOf(AccountDeletedError);
  });

  it("takes the same lock before persisting a hash-only deletion marker", async () => {
    await markAccountDeleting(transaction as never, userId);

    expect(transaction.accountDeletionGuard.upsert).toHaveBeenCalledWith({
      where: { userIdHash },
      create: { userIdHash },
      update: {},
    });
    expect(transaction.accountDeletionGuard.upsert).not.toHaveBeenCalledWith(
      expect.objectContaining({ where: { userId } }),
    );
    expect(transaction.$queryRaw.mock.invocationCallOrder[0]).toBeLessThan(
      transaction.accountDeletionGuard.upsert.mock.invocationCallOrder[0],
    );
  });
});
