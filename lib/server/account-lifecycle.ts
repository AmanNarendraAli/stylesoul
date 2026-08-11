import "server-only";

import { createHash } from "node:crypto";
import type { Prisma } from "@prisma/client";

export class AccountDeletedError extends Error {
  constructor() {
    super("Account deletion is in progress");
    this.name = "AccountDeletedError";
  }
}

function deletionGuardHash(userId: string) {
  return createHash("sha256").update(userId).digest("hex");
}

async function lockAccountLifecycle(
  transaction: Prisma.TransactionClient,
  userId: string,
) {
  await transaction.$queryRaw`
    SELECT 1::int AS "locked"
    FROM (
      SELECT pg_advisory_xact_lock(hashtextextended(${userId}, 0))
    ) AS "accountLock"
  `;
}

export async function assertAccountWritable(
  transaction: Prisma.TransactionClient,
  userId: string,
) {
  await lockAccountLifecycle(transaction, userId);
  const guard = await transaction.accountDeletionGuard.findUnique({
    where: { userIdHash: deletionGuardHash(userId) },
    select: { userIdHash: true },
  });
  if (guard) throw new AccountDeletedError();
}

export async function markAccountDeleting(
  transaction: Prisma.TransactionClient,
  userId: string,
) {
  await lockAccountLifecycle(transaction, userId);
  const userIdHash = deletionGuardHash(userId);
  return transaction.accountDeletionGuard.upsert({
    where: { userIdHash },
    create: { userIdHash },
    update: {},
  });
}
