import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  upsertUser: vi.fn(),
  createEvents: vi.fn(),
  reportServerError: vi.fn(),
  transaction: vi.fn(),
  assertAccountWritable: vi.fn(),
  AccountDeletedError: class AccountDeletedError extends Error {},
}));

const transactionClient = {
  user: { upsert: mocks.upsertUser },
  funnelEvent: { createMany: mocks.createEvents },
};

vi.mock("@/lib/db/prisma", () => ({
  prisma: { $transaction: mocks.transaction },
}));
vi.mock("@/lib/server/account-lifecycle", () => ({
  AccountDeletedError: mocks.AccountDeletedError,
  assertAccountWritable: mocks.assertAccountWritable,
}));
vi.mock("@/lib/observability/redact", () => ({
  reportServerError: mocks.reportServerError,
}));

import { recordFunnelEvent } from "@/lib/server/funnel";

beforeEach(() => {
  vi.clearAllMocks();
  mocks.upsertUser.mockResolvedValue({ id: "user-1" });
  mocks.createEvents.mockResolvedValue({ count: 1 });
  mocks.transaction.mockImplementation(
    (operation: (transaction: typeof transactionClient) => Promise<unknown>) =>
      operation(transactionClient),
  );
  mocks.assertAccountWritable.mockResolvedValue(undefined);
});

describe("first-party funnel events", () => {
  it("records the original Supabase signup timestamp exactly once per user", async () => {
    const occurredAt = new Date("2026-07-01T09:00:00.000Z");

    await recordFunnelEvent({
      userId: "user-1",
      name: "signup_complete",
      email: "person@example.com",
      occurredAt,
    });

    expect(mocks.upsertUser).toHaveBeenCalledWith({
      where: { id: "user-1" },
      create: { id: "user-1", email: "person@example.com" },
      update: { email: "person@example.com" },
    });
    expect(mocks.createEvents).toHaveBeenCalledWith({
      data: [
        { userId: "user-1", name: "signup_complete", createdAt: occurredAt },
      ],
      skipDuplicates: true,
    });
    expect(mocks.assertAccountWritable).toHaveBeenCalledWith(
      transactionClient,
      "user-1",
    );
  });

  it("uses a duplicate-skipping insert for repeated milestones", async () => {
    await recordFunnelEvent({ userId: "user-1", name: "analysis_complete" });
    await recordFunnelEvent({ userId: "user-1", name: "analysis_complete" });

    expect(mocks.createEvents).toHaveBeenCalledTimes(2);
    for (const [request] of mocks.createEvents.mock.calls) {
      expect(request).toMatchObject({
        data: [{ userId: "user-1", name: "analysis_complete" }],
        skipDuplicates: true,
      });
    }
  });

  it("never blocks the product path when analytics persistence fails", async () => {
    const databaseError = new Error("Database unavailable");
    mocks.createEvents.mockRejectedValue(databaseError);

    await expect(
      recordFunnelEvent({ userId: "user-1", name: "first_edit_view" }),
    ).resolves.toBeNull();
    expect(mocks.reportServerError).toHaveBeenCalledWith(
      "funnel_event_record_failed",
      databaseError,
      { userId: "user-1", name: "first_edit_view" },
    );
  });

  it("silently rejects events for an account being deleted", async () => {
    mocks.assertAccountWritable.mockRejectedValue(
      new mocks.AccountDeletedError(),
    );

    await expect(
      recordFunnelEvent({ userId: "user-1", name: "first_edit_view" }),
    ).resolves.toBeNull();
    expect(mocks.createEvents).not.toHaveBeenCalled();
    expect(mocks.reportServerError).not.toHaveBeenCalled();
  });
});
