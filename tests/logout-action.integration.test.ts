// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createClient: vi.fn(),
  signOut: vi.fn(),
  redirect: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: mocks.createClient,
}));
vi.mock("next/navigation", () => ({ redirect: mocks.redirect }));

import { logOut } from "@/app/(app)/actions";

beforeEach(() => {
  vi.clearAllMocks();
  mocks.signOut.mockResolvedValue({ error: null });
  mocks.createClient.mockResolvedValue({ auth: { signOut: mocks.signOut } });
});

describe("logout action", () => {
  it("clears the local session and returns to the public homepage", async () => {
    await logOut();

    expect(mocks.signOut).toHaveBeenCalledWith({ scope: "local" });
    expect(mocks.redirect).toHaveBeenCalledWith("/");
  });
});
