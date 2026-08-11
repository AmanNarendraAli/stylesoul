import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createBrowserClient: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock("@supabase/ssr", () => ({
  createBrowserClient: mocks.createBrowserClient,
}));
import { AccountDataControls } from "@/components/account/AccountDataControls";
import { ONBOARDING_DRAFT_STORAGE_KEY } from "@/lib/onboarding-draft";

beforeEach(() => {
  vi.restoreAllMocks();
  vi.clearAllMocks();
  sessionStorage.clear();
  mocks.signOut.mockResolvedValue({ error: null });
  mocks.createBrowserClient.mockReturnValue({
    auth: { signOut: mocks.signOut },
  });
});

afterEach(() => {
  cleanup();
});

describe("account data controls", () => {
  it("offers a downloadable export and describes retained audit anonymisation", () => {
    render(<AccountDataControls />);

    const exportLink = screen.getByRole("link", { name: "Download my data" });
    expect(exportLink.getAttribute("href")).toBe("/api/account/export");
    expect(exportLink.hasAttribute("download")).toBe(true);
    expect(
      screen.getByText(/Catalogue audit history is retained/).textContent,
    ).toContain("link to your account is removed");
    expect(
      screen.getByText(/one-way deletion marker/).textContent,
    ).toContain("prevent an in-flight request from recreating");
  });

  it("does not call deletion when the user cancels confirmation", () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");
    vi.spyOn(window, "confirm").mockReturnValue(false);
    sessionStorage.setItem(
      ONBOARDING_DRAFT_STORAGE_KEY,
      JSON.stringify({ body: { heightCm: 170 } }),
    );
    render(<AccountDataControls />);

    fireEvent.click(screen.getByRole("button", { name: "Delete my account" }));

    expect(fetchMock).not.toHaveBeenCalled();
    expect(sessionStorage.getItem(ONBOARDING_DRAFT_STORAGE_KEY)).not.toBeNull();
    expect(mocks.signOut).not.toHaveBeenCalled();
  });

  it("clears the onboarding draft and local auth session after deletion", async () => {
    sessionStorage.setItem(
      ONBOARDING_DRAFT_STORAGE_KEY,
      JSON.stringify({ body: { heightCm: 170 } }),
    );
    vi.spyOn(window, "confirm").mockReturnValue(true);
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ deleted: true }), { status: 200 }),
    );
    const { promise } = Promise.withResolvers<void>();
    mocks.signOut.mockReturnValue(promise);
    render(<AccountDataControls />);

    fireEvent.click(screen.getByRole("button", { name: "Delete my account" }));

    await waitFor(() =>
      expect(mocks.signOut).toHaveBeenCalledWith({ scope: "local" }),
    );
    expect(sessionStorage.getItem(ONBOARDING_DRAFT_STORAGE_KEY)).toBeNull();
  });

  it("shows a retryable API error without navigating away", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    sessionStorage.setItem(
      ONBOARDING_DRAFT_STORAGE_KEY,
      JSON.stringify({ body: { heightCm: 170 } }),
    );
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ message: "Account deletion is unavailable" }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      }),
    );
    render(<AccountDataControls />);

    fireEvent.click(screen.getByRole("button", { name: "Delete my account" }));

    expect((await screen.findByRole("alert")).textContent).toContain(
      "Account deletion is unavailable",
    );
    expect(sessionStorage.getItem(ONBOARDING_DRAFT_STORAGE_KEY)).not.toBeNull();
    expect(mocks.signOut).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(
        (screen.getByRole("button", {
          name: "Delete my account",
        }) as HTMLButtonElement).disabled,
      ).toBe(false);
    });
  });
});
