import type { ReactNode } from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import OnboardingAnalysingPage from "@/app/(app)/onboarding/analysing/page";
import OnboardingBodyPage from "@/app/(app)/onboarding/body/page";
import OnboardingEntryPage from "@/app/(app)/onboarding/page";
import { OnboardingProvider } from "@/app/(app)/onboarding/OnboardingProvider";
import { ONBOARDING_DRAFT_STORAGE_KEY as DRAFT_STORAGE_KEY } from "@/lib/onboarding-draft";

const router = vi.hoisted(() => ({
  push: vi.fn(),
  replace: vi.fn(),
}));

const entry = vi.hoisted(() => ({
  getUser: vi.fn(),
  hasStyleProfile: vi.fn(),
  redirect: vi.fn((path: string) => {
    throw new Error(`redirect:${path}`);
  }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => router,
  useSearchParams: () => new URLSearchParams(),
  redirect: entry.redirect,
}));

vi.mock("@/lib/server/profile", () => ({
  hasStyleProfile: entry.hasStyleProfile,
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: async () => ({ auth: { getUser: entry.getUser } }),
}));

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: ReactNode }) => children,
  motion: {
    div: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    span: ({ children }: { children?: ReactNode }) => <span>{children}</span>,
  },
}));

vi.mock("@/components/avatar/Avatar", () => ({
  Avatar: () => null,
}));

const body = {
  heightCm: 170,
  bustCm: 90,
  waistCm: 65,
  hipsCm: 90,
  shouldersCm: 40,
};
const colouring = {
  skinTone: "fair",
  undertone: "warm",
  eyeColour: "green",
  hairColour: "golden_blonde",
};

function renderOnboarding(page: ReactNode) {
  return render(<OnboardingProvider>{page}</OnboardingProvider>);
}

function storedDraft() {
  return JSON.parse(sessionStorage.getItem(DRAFT_STORAGE_KEY) ?? "{}");
}

beforeEach(() => {
  // These tests enter centimetres; tests/ui/measurement-units.test.tsx covers inches.
  document.cookie = "stylesoul_units=cm; path=/";
  vi.restoreAllMocks();
  sessionStorage.clear();
  router.push.mockReset();
  router.replace.mockReset();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("onboarding entry", () => {
  it("starts new users on the colouring step", async () => {
    entry.getUser.mockResolvedValue({ data: { user: { id: "user-1" } } });
    entry.hasStyleProfile.mockResolvedValue(false);

    await expect(OnboardingEntryPage()).rejects.toThrow(
      "redirect:/onboarding/colouring",
    );
  });
});

describe("body step (step 2)", () => {
  it("sends users without colouring back to the colouring step", async () => {
    sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ body }));

    renderOnboarding(<OnboardingBodyPage />);

    await waitFor(() => {
      expect(router.replace).toHaveBeenCalledWith("/onboarding/colouring");
    });
  });

  it("continues to analysis with the entered measurements", async () => {
    sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ colouring }));

    renderOnboarding(<OnboardingBodyPage />);

    expect(screen.queryByRole("spinbutton", { name: /Weight/ })).toBeNull();
    for (const [name, value] of [
      [/Bust/, "90"],
      [/Waist/, "65"],
      [/Hips/, "90"],
    ] as const) {
      fireEvent.change(screen.getByRole("spinbutton", { name }), {
        target: { value },
      });
    }
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith("/onboarding/analysing");
      expect(storedDraft().body).toEqual({ bustCm: 90, waistCm: 65, hipsCm: 90 });
    });
    expect(router.replace).not.toHaveBeenCalled();
  });

  it("goes back to the colouring step", async () => {
    sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ colouring }));

    renderOnboarding(<OnboardingBodyPage />);
    fireEvent.click(screen.getByRole("button", { name: "Back" }));

    expect(router.push).toHaveBeenCalledWith("/onboarding/colouring");
  });

  it("skips to analysis without measurements, discarding any draft values", async () => {
    sessionStorage.setItem(
      DRAFT_STORAGE_KEY,
      JSON.stringify({ body, colouring }),
    );

    renderOnboarding(<OnboardingBodyPage />);
    await waitFor(() => {
      expect(
        (screen.getByRole("spinbutton", { name: /Height/ }) as HTMLInputElement)
          .value,
      ).toBe("170");
    });
    fireEvent.click(screen.getByRole("button", { name: "Skip for now" }));

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith("/onboarding/analysing");
      expect(storedDraft()).toEqual({ colouring });
    });
  });
});

describe("analysis without measurements", () => {
  it("requires colouring before analysing", async () => {
    sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ body }));
    vi.spyOn(globalThis, "fetch");

    renderOnboarding(<OnboardingAnalysingPage />);

    await waitFor(() => {
      expect(router.replace).toHaveBeenCalledWith("/onboarding/colouring");
    });
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("saves a colouring-only profile and omits the shape step", async () => {
    vi.useFakeTimers();
    sessionStorage.setItem(
      DRAFT_STORAGE_KEY,
      JSON.stringify({ colouring, colouringSource: "photo" }),
    );
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue({ ok: true } as Response);

    renderOnboarding(<OnboardingAnalysingPage />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(screen.queryByText(/your shape/i)).toBeNull();
    expect(screen.getByText(/colour season/i)).toBeTruthy();

    await act(async () => {
      await vi.runAllTimersAsync();
    });

    const [requestUrl, requestInit] = fetchMock.mock.calls[0];
    expect(requestUrl).toBe("/api/profile");
    expect(requestInit?.method).toBe("POST");
    expect(JSON.parse(requestInit?.body as string)).toEqual({
      ...colouring,
      detectionSource: "photo",
    });
    expect(router.replace).toHaveBeenCalledWith("/profile");
  });

  it("shows the shape step when measurements are present", async () => {
    vi.useFakeTimers();
    sessionStorage.setItem(
      DRAFT_STORAGE_KEY,
      JSON.stringify({ body, colouring }),
    );
    vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true } as Response);

    renderOnboarding(<OnboardingAnalysingPage />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(screen.getByText(/your shape/i)).toBeTruthy();
  });
});
