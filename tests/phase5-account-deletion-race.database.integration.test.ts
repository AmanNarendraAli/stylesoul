// @vitest-environment node
import { createHash, randomUUID } from "node:crypto";
import { PrismaClient } from "@prisma/client";
import { afterAll, describe, expect, it } from "vitest";
import {
  AccountDeletedError,
  assertAccountWritable,
} from "@/lib/server/account-lifecycle";
import { deleteAccountDatabaseData } from "@/lib/server/account-data";
import { consumeAnalysisRateLimit } from "@/lib/server/analysis-rate-limit";
import { createCatalogueProduct } from "@/lib/server/catalogue";
import { recordFunnelEvent } from "@/lib/server/funnel";
import { saveStyleProfile } from "@/lib/server/profile";
import { prisma } from "@/lib/db/prisma";
import { normalizePrismaConnectionUrl } from "@/lib/db/connection-url";

const runDatabaseTests = process.env.RUN_DATABASE_TESTS === "1";
const datasourceUrl = normalizePrismaConnectionUrl(process.env.DATABASE_URL);
const mutationPrisma = new PrismaClient({ datasourceUrl });
const observerPrisma = new PrismaClient({ datasourceUrl });
const userId = randomUUID();
const email = `deletion-race-${userId}@example.com`;
const userIdHash = createHash("sha256").update(userId).digest("hex");
const productUrl = `https://example.com/deletion-race-${userId}`;

const profileInput = {
  heightCm: 170,
  weightKg: 64,
  bustCm: 90,
  waistCm: 65,
  hipsCm: 90,
  shouldersCm: 40,
  skinTone: "medium" as const,
  undertone: "warm" as const,
  eyeColour: "hazel" as const,
  hairColour: "black" as const,
  temperature: "warm" as const,
  value: "medium" as const,
  chroma: "soft" as const,
  contrast: "medium" as const,
  detectionSource: "manual" as const,
};

async function cleanup() {
  const product = await prisma.product.findUnique({
    where: { productUrl },
    select: { id: true },
  });
  if (product) {
    await prisma.catalogueAuditLog.deleteMany({
      where: { productId: product.id },
    });
    await prisma.product.delete({ where: { id: product.id } });
  }
  await prisma.analysisRateLimit.deleteMany({ where: { userId } });
  await prisma.user.deleteMany({ where: { id: userId } });
  await prisma.accountDeletionGuard.deleteMany({ where: { userIdHash } });
}


async function readLifecycleLockState() {
  const [state] = await observerPrisma.$queryRaw<
    Array<{ holders: number; waiters: number }>
  >`
    WITH "accountKey" AS (
      SELECT hashtextextended(${userId}, 0) AS "value"
    )
    SELECT
      COUNT(*) FILTER (WHERE "granted")::int AS "holders",
      COUNT(*) FILTER (WHERE NOT "granted")::int AS "waiters"
    FROM pg_locks, "accountKey"
    WHERE "locktype" = 'advisory'
      AND "classid" = ((("value" >> 32) & 4294967295)::oid)
      AND "objid" = (("value" & 4294967295)::oid)
      AND "objsubid" = 1
  `;
  return state ?? { holders: 0, waiters: 0 };
}

async function waitForDeletionLockWaiter() {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const state = await readLifecycleLockState();
    if (state.waiters > 0) return;
    await Promise.resolve();
  }
  throw new Error("Deletion never waited on the account lifecycle lock");
}

describe.runIf(runDatabaseTests)("account deletion concurrency boundary", () => {
  afterAll(async () => {
    await cleanup();
    await Promise.all([
      prisma.$disconnect(),
      mutationPrisma.$disconnect(),
      observerPrisma.$disconnect(),
    ]);
  });

  it(
    "removes an in-flight rate-limit write and rejects every recreation path",
    async () => {
      await cleanup();

      let releaseMutation!: () => void;
      const mutationMayFinish = new Promise<void>((resolve) => {
        releaseMutation = resolve;
      });
      let mutationLocked!: () => void;
      const mutationHasLock = new Promise<void>((resolve) => {
        mutationLocked = resolve;
      });

      const inFlightMutation = mutationPrisma.$transaction(
        async (transaction) => {
          await assertAccountWritable(transaction, userId);
          mutationLocked();
          await mutationMayFinish;
          await transaction.analysisRateLimit.upsert({
            where: { userId },
            create: {
              userId,
              requestCount: 1,
              windowStart: new Date("2026-07-14T19:10:00.000Z"),
            },
            update: { requestCount: { increment: 1 } },
          });
        },
        { timeout: 20_000 },
      );

      await mutationHasLock;
      expect(await readLifecycleLockState()).toEqual({
        holders: 1,
        waiters: 0,
      });
      let deletionFinished = false;
      const deletion = deleteAccountDatabaseData(userId).then((result) => {
        deletionFinished = true;
        return result;
      });

      let waiterFailure: unknown;
      try {
        await waitForDeletionLockWaiter();
        expect(deletionFinished).toBe(false);
      } catch (error) {
        waiterFailure = error;
      } finally {
        releaseMutation();
      }
      await inFlightMutation;
      const deletionResult = await deletion;
      if (waiterFailure) throw waiterFailure;

      expect(deletionResult).toEqual({
        deletedAccountRows: 0,
        deletedRateLimitRows: 1,
      });
      expect(await prisma.user.findUnique({ where: { id: userId } })).toBeNull();
      expect(
        await prisma.accountDeletionGuard.findUnique({ where: { userIdHash } }),
      ).not.toBeNull();
      expect(
        await prisma.analysisRateLimit.findUnique({ where: { userId } }),
      ).toBeNull();

      await expect(
        saveStyleProfile({ userId, email, input: profileInput }),
      ).rejects.toBeInstanceOf(AccountDeletedError);
      await expect(consumeAnalysisRateLimit(userId)).rejects.toBeInstanceOf(
        AccountDeletedError,
      );
      await expect(
        createCatalogueProduct(
          { id: userId, email },
          {
            brand: "StyleSoul QA",
            title: "Deletion race guard",
            description: "Disposable concurrency regression",
            imageUrl: "https://example.com/deletion-race.jpg",
            productUrl,
            priceCents: 100,
            currency: "GBP",
            status: "inactive",
            eligibleShapes: ["hourglass"],
            eligibleSeasons: ["warm_autumn"],
            garmentCategory: "accessories",
            occasionTags: ["casual"],
            priceTier: "entry",
          },
        ),
      ).rejects.toBeInstanceOf(AccountDeletedError);
      await expect(
        recordFunnelEvent({
          userId,
          email,
          name: "signup_complete",
        }),
      ).resolves.toBeNull();

      expect(await prisma.user.findUnique({ where: { id: userId } })).toBeNull();
      expect(
        await prisma.analysisRateLimit.findUnique({ where: { userId } }),
      ).toBeNull();
      expect(
        await prisma.product.findUnique({ where: { productUrl } }),
      ).toBeNull();
    },
    30_000,
  );
});
