import "server-only";

import { prisma } from "@/lib/db/prisma";
import { assertAccountWritable } from "@/lib/server/account-lifecycle";

export const ANALYSIS_RATE_LIMIT = 5;
export const ANALYSIS_RATE_WINDOW_MS = 60_000;

type RateLimitState = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

export async function consumeAnalysisRateLimit(
  userId: string,
  now = new Date(),
): Promise<RateLimitState> {
  const windowStart = new Date(
    Math.floor(now.getTime() / ANALYSIS_RATE_WINDOW_MS) * ANALYSIS_RATE_WINDOW_MS,
  );
  const [state] = await prisma.$transaction(async (transaction) => {
    await assertAccountWritable(transaction, userId);
    return transaction.$queryRaw<
      Array<{ requestCount: number; windowStart: Date }>
    >`
      INSERT INTO "AnalysisRateLimit" (
        "userId",
        "windowStart",
        "requestCount",
        "updatedAt"
      )
      VALUES (${userId}, ${windowStart}, 1, ${now})
      ON CONFLICT ("userId") DO UPDATE SET
        "windowStart" = GREATEST(
          "AnalysisRateLimit"."windowStart",
          EXCLUDED."windowStart"
        ),
        "requestCount" = CASE
          WHEN "AnalysisRateLimit"."windowStart" >= EXCLUDED."windowStart"
            THEN "AnalysisRateLimit"."requestCount" + 1
          ELSE 1
        END,
        "updatedAt" = GREATEST(
          "AnalysisRateLimit"."updatedAt",
          EXCLUDED."updatedAt"
        )
      RETURNING "requestCount", "windowStart"
    `;
  });

  const requestCount = state?.requestCount ?? ANALYSIS_RATE_LIMIT + 1;
  const activeWindowStart = state?.windowStart ?? windowStart;
  return {
    allowed: requestCount <= ANALYSIS_RATE_LIMIT,
    remaining: Math.max(0, ANALYSIS_RATE_LIMIT - requestCount),
    retryAfterSeconds: Math.max(
      1,
      Math.ceil(
        (activeWindowStart.getTime() + ANALYSIS_RATE_WINDOW_MS - now.getTime()) /
          1000,
      ),
    ),
  };
}
