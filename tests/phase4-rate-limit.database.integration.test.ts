// @vitest-environment node
import { randomUUID } from "node:crypto";
import { afterAll, describe, expect, it } from "vitest";
import { prisma } from "@/lib/db/prisma";
import { consumeAnalysisRateLimit } from "@/lib/server/analysis-rate-limit";

const runDatabaseTests = process.env.RUN_DATABASE_TESTS === "1";
const fixtureUserId = `phase4-rate-limit-${randomUUID()}`;

describe.runIf(runDatabaseTests)("photo-analysis limiter database boundary", () => {
  afterAll(async () => {
    await prisma.analysisRateLimit.deleteMany({
      where: { userId: fixtureUserId },
    });
    await prisma.$disconnect();
  });

  it("never moves a newer stored window backward for a stale request", async () => {
    const newerWindowRequest = new Date("2026-07-14T19:11:00.500Z");
    const staleRequest = new Date("2026-07-14T19:10:59.000Z");

    await consumeAnalysisRateLimit(fixtureUserId, newerWindowRequest);
    const staleResult = await consumeAnalysisRateLimit(
      fixtureUserId,
      staleRequest,
    );
    const stored = await prisma.analysisRateLimit.findUniqueOrThrow({
      where: { userId: fixtureUserId },
    });

    expect(stored.windowStart).toEqual(
      new Date("2026-07-14T19:11:00.000Z"),
    );
    expect(stored.requestCount).toBe(2);
    expect(staleResult.allowed).toBe(true);
    expect(staleResult.remaining).toBe(3);
    expect(staleResult.retryAfterSeconds).toBe(61);
  });
});
