import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getAuthenticatedUserState: vi.fn(),
  recordFunnelEvent: vi.fn(),
}));

vi.mock("@/lib/server/auth", () => ({
  getAuthenticatedUserState: mocks.getAuthenticatedUserState,
}));
vi.mock("@/lib/server/funnel", () => ({
  recordFunnelEvent: mocks.recordFunnelEvent,
}));

import { POST } from "@/app/api/funnel/first-edit/route";

beforeEach(() => {
  mocks.getAuthenticatedUserState.mockResolvedValue({
    available: true,
    user: { id: "user-1" },
  });
  mocks.recordFunnelEvent.mockResolvedValue({ count: 1 });
});

describe("first-edit view endpoint", () => {
  it("records an authenticated mounted view without a response payload", async () => {
    const response = await POST();

    expect(response.status).toBe(204);
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    expect(await response.text()).toBe("");
    expect(mocks.recordFunnelEvent).toHaveBeenCalledWith({
      userId: "user-1",
      name: "first_edit_view",
    });
  });

  it("keeps analytics persistence failures off the product path", async () => {
    mocks.recordFunnelEvent.mockResolvedValue(null);

    const response = await POST();

    expect(response.status).toBe(204);
  });

  it("rejects unauthenticated requests", async () => {
    mocks.getAuthenticatedUserState.mockResolvedValue({
      available: true,
      user: null,
    });

    const response = await POST();

    expect(response.status).toBe(401);
    expect(mocks.recordFunnelEvent).not.toHaveBeenCalled();
  });

  it("reports a retryable authentication outage", async () => {
    mocks.getAuthenticatedUserState.mockResolvedValue({
      available: false,
      user: null,
    });

    const response = await POST();

    expect(response.status).toBe(503);
    expect(mocks.recordFunnelEvent).not.toHaveBeenCalled();
  });
});
