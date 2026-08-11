// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  queryRaw: vi.fn(),
  transaction: vi.fn(),
  assertAccountWritable: vi.fn(),
}));

const transactionClient = { $queryRaw: mocks.queryRaw };

vi.mock("@/lib/db/prisma", () => ({
  prisma: { $transaction: mocks.transaction },
}));
vi.mock("@/lib/server/account-lifecycle", () => ({
  assertAccountWritable: mocks.assertAccountWritable,
}));

import {
  ANALYSIS_RATE_LIMIT,
  consumeAnalysisRateLimit,
} from "@/lib/server/analysis-rate-limit";
import {
  redactObservabilityData,
  reportServerError,
} from "@/lib/observability/redact";

beforeEach(() => {
  mocks.queryRaw.mockReset();
  mocks.transaction.mockReset();
  mocks.transaction.mockImplementation(
    (operation: (transaction: typeof transactionClient) => Promise<unknown>) =>
      operation(transactionClient),
  );
  mocks.assertAccountWritable.mockReset();
  mocks.assertAccountWritable.mockResolvedValue(undefined);
  vi.restoreAllMocks();
});

describe("photo-analysis rate limiting", () => {
  it("allows the configured number of requests without requiring a local user row", async () => {
    mocks.queryRaw.mockResolvedValue([
      {
        requestCount: ANALYSIS_RATE_LIMIT,
        windowStart: new Date("2026-07-14T19:10:00.000Z"),
      },
    ]);

    const result = await consumeAnalysisRateLimit(
      "supabase-user-without-profile",
      new Date("2026-07-14T19:10:30.000Z"),
    );

    expect(result).toEqual({
      allowed: true,
      remaining: 0,
      retryAfterSeconds: 30,
    });
    expect(mocks.queryRaw).toHaveBeenCalledOnce();
    expect(mocks.assertAccountWritable).toHaveBeenCalledWith(
      transactionClient,
      "supabase-user-without-profile",
    );
  });

  it("blocks requests beyond the per-minute limit", async () => {
    mocks.queryRaw.mockResolvedValue([
      {
        requestCount: ANALYSIS_RATE_LIMIT + 1,
        windowStart: new Date("2026-07-14T19:10:00.000Z"),
      },
    ]);

    const result = await consumeAnalysisRateLimit(
      "user-1",
      new Date("2026-07-14T19:10:59.500Z"),
    );

    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
    expect(result.retryAfterSeconds).toBe(1);
  });

  it("uses the newer stored window when a stale boundary request completes late", async () => {
    mocks.queryRaw.mockResolvedValue([
      {
        requestCount: ANALYSIS_RATE_LIMIT + 1,
        windowStart: new Date("2026-07-14T19:11:00.000Z"),
      },
    ]);

    const result = await consumeAnalysisRateLimit(
      "user-1",
      new Date("2026-07-14T19:10:59.000Z"),
    );

    expect(result.allowed).toBe(false);
    expect(result.retryAfterSeconds).toBe(61);
  });
  it("does not recreate rate-limit metadata after deletion begins", async () => {
    const deletionError = new Error("Account deletion is in progress");
    mocks.assertAccountWritable.mockRejectedValue(deletionError);

    await expect(consumeAnalysisRateLimit("user-1")).rejects.toBe(deletionError);
    expect(mocks.queryRaw).not.toHaveBeenCalled();
  });

});

describe("observability redaction", () => {
  it("redacts profile fields, pixels, emails, cookies, and tokens recursively", () => {
    const result = redactObservabilityData({
      email: "person@example.com",
      userId: "00000000-0000-4000-8000-000000000001",
      profile: { heightCm: 170, waistCm: 65, bodyShape: "hourglass" },
      request: {
        pixels: [1, 2, 3, 255],
        data: new Uint8ClampedArray([1, 2, 3, 255]),
        authorization: "Bearer secret-token",
        note: "Contact person@example.com with Bearer another-secret",
      },
      refresh_token: "secret",
    });

    expect(result).toEqual({
      email: "[REDACTED]",
      userId: "[REDACTED]",
      profile: "[REDACTED]",
      request: {
        pixels: "[REDACTED]",
        data: "[REDACTED]",
        authorization: "[REDACTED]",
        note: "Contact [REDACTED_EMAIL] with Bearer [REDACTED]",
      },
      refresh_token: "[REDACTED]",
    });
  });

  it("logs only redacted error context", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    reportServerError(
      "test_failure",
      new Error(
        "waistCm=65 pixels=[1,2,3,255] cookie=session-secret refresh_token=opaque-secret person@example.com",
      ),
      {
        pixels: [1, 2, 3, 255],
        cookie: "session-secret",
      },
    );

    expect(consoleError).toHaveBeenCalledOnce();
    expect(JSON.stringify(consoleError.mock.calls[0])).not.toContain(
      "person@example.com",
    );
    expect(JSON.stringify(consoleError.mock.calls[0])).not.toContain(
      "session-secret",
    );
    expect(JSON.stringify(consoleError.mock.calls[0])).not.toContain(
      "1,2,3,255",
    );
    expect(JSON.stringify(consoleError.mock.calls[0])).not.toContain("waistCm=65");
    expect(JSON.stringify(consoleError.mock.calls[0])).not.toContain("opaque-secret");
  });
});
