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
import OnboardingColouringPage from "@/app/(app)/onboarding/colouring/page";
import { OnboardingProvider } from "@/app/(app)/onboarding/OnboardingProvider";
import { ONBOARDING_DRAFT_STORAGE_KEY as DRAFT_STORAGE_KEY } from "@/lib/onboarding-draft";

const router = vi.hoisted(() => ({
  push: vi.fn(),
  replace: vi.fn(),
}));
const nav = vi.hoisted(() => ({ search: new URLSearchParams() }));

const detection = vi.hoisted(() => ({
  detectFromPhoto: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => router,
  useSearchParams: () => nav.search,
}));

vi.mock("@/components/onboarding/colour-detection-client", () => ({
  detectFromPhoto: detection.detectFromPhoto,
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
const DIMENSION_KEYS = ["temperature", "value", "chroma", "contrast"];

function renderOnboarding(page: ReactNode) {
  return render(<OnboardingProvider>{page}</OnboardingProvider>);
}

beforeEach(() => {
  vi.restoreAllMocks();
  sessionStorage.clear();
  router.push.mockReset();
  router.replace.mockReset();
  nav.search = new URLSearchParams();
  detection.detectFromPhoto.mockReset();
  detection.detectFromPhoto.mockResolvedValue({
    ok: false,
    reason: "no_face",
    message: "We could not find a face in that photo.",
  });
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("onboarding draft hydration", () => {
  it("restores body inputs after a direct reload", async () => {
    sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ body }));

    renderOnboarding(<OnboardingBodyPage />);

    await waitFor(() => {
      expect(
        (screen.getByRole("spinbutton", { name: /Height/ }) as HTMLInputElement)
          .value,
      ).toBe("170");
      expect(
        (screen.getByRole("spinbutton", { name: /Waist/ }) as HTMLInputElement)
          .value,
      ).toBe("65");
    });
    expect(JSON.parse(sessionStorage.getItem(DRAFT_STORAGE_KEY) ?? "{}").body).toEqual(body);
  });

  it("restores colouring choices before deciding whether to redirect", async () => {
    sessionStorage.setItem(
      DRAFT_STORAGE_KEY,
      JSON.stringify({ body, colouring, colouringSource: "photo" }),
    );

    renderOnboarding(<OnboardingColouringPage />);

    await waitFor(() => {
      for (const name of ["Fair", "Warm", "Green", "Golden blonde"]) {
        expect(
          screen.getByRole("button", { name }).getAttribute("aria-pressed"),
        ).toBe("true");
      }
    });
    expect(router.replace).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith("/onboarding/body");
      const stored = JSON.parse(sessionStorage.getItem(DRAFT_STORAGE_KEY) ?? "{}");
      expect(stored.colouring).toEqual(colouring);
      expect(stored.colouringSource).toBe("photo");
    });
  });

  it("submits the four manually chosen swatches into the draft", async () => {
    sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ body }));

    renderOnboarding(<OnboardingColouringPage />);

    for (const name of ["Fair", "Warm", "Green", "Golden blonde"]) {
      fireEvent.click(await screen.findByRole("button", { name }));
    }
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith("/onboarding/body");
      const stored = JSON.parse(sessionStorage.getItem(DRAFT_STORAGE_KEY) ?? "{}");
      expect(stored.colouring).toEqual(colouring);
      expect(stored.colouringSource).toBe("manual");
      expect(stored).not.toHaveProperty("dimensions");
    });
  });

  it("requires every swatch with friendly, described errors", async () => {
    sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ body }));

    renderOnboarding(<OnboardingColouringPage />);

    fireEvent.click(await screen.findByRole("button", { name: "Continue" }));

    await waitFor(() => {
      for (const [name, message] of [
        ["Skin tone", "Pick a skin tone"],
        ["Undertone", "Pick an undertone"],
        ["Eye colour", "Pick an eye colour"],
        ["Hair colour", "Pick a hair colour"],
      ]) {
        const group = screen.getByRole("group", { name });
        const errorId = group.getAttribute("aria-describedby");
        expect(document.getElementById(errorId ?? "")?.textContent).toBe(message);
      }
    });
    expect(router.push).not.toHaveBeenCalled();
  });

  it("marks reloaded photo colouring as corrected when a swatch changes", async () => {
    sessionStorage.setItem(
      DRAFT_STORAGE_KEY,
      JSON.stringify({ body, colouring, colouringSource: "photo" }),
    );

    renderOnboarding(<OnboardingColouringPage />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Fair" }).getAttribute("aria-pressed"),
      ).toBe("true");
    });
    fireEvent.click(screen.getByRole("button", { name: "Light" }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await waitFor(() => {
      expect(
        JSON.parse(sessionStorage.getItem(DRAFT_STORAGE_KEY) ?? "{}")
          .colouringSource,
      ).toBe("photo_corrected");
    });
  });

  it("retains valid sections while rejecting a tampered partial draft", async () => {
    sessionStorage.setItem(
      DRAFT_STORAGE_KEY,
      JSON.stringify({
        body: { ...body, heightCm: 20 },
        colouring,
        colouringSource: "photo",
      }),
    );

    renderOnboarding(<OnboardingColouringPage />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Fair" }).getAttribute("aria-pressed"),
      ).toBe("true");
    });
    expect(
      JSON.parse(sessionStorage.getItem(DRAFT_STORAGE_KEY) ?? "{}"),
    ).toEqual({ colouring, colouringSource: "photo" });
  });

  it("clears malformed JSON instead of exposing or overwriting a draft", async () => {
    sessionStorage.setItem(DRAFT_STORAGE_KEY, "{not-json");

    renderOnboarding(<div />);

    await waitFor(() => {
      expect(sessionStorage.getItem(DRAFT_STORAGE_KEY)).toBe("{}");
    });
  });

  it("states the allowed range for each invalid measurement", async () => {
    sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ body }));
    renderOnboarding(<OnboardingBodyPage />);
    const bust = screen.getByRole("spinbutton", { name: /Bust/ });
    await waitFor(() => expect((bust as HTMLInputElement).value).toBe("90"));

    fireEvent.change(bust, { target: { value: "" } });
    fireEvent.change(screen.getByRole("spinbutton", { name: /Waist/ }), {
      target: { value: "30" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await waitFor(() => {
      expect(document.getElementById("bustCm-error")?.textContent).toMatch(
        /60 and 180 cm/,
      );
      expect(document.getElementById("waistCm-error")?.textContent).toMatch(
        /45 and 180 cm/,
      );
    });
    expect(router.push).not.toHaveBeenCalled();
  });

  it("keeps in-progress swatch picks across a reload", async () => {
    sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ body }));

    const { unmount } = renderOnboarding(<OnboardingColouringPage />);
    fireEvent.click(await screen.findByRole("button", { name: "Fair" }));
    fireEvent.click(screen.getByRole("button", { name: "Green" }));
    await waitFor(() => {
      expect(
        JSON.parse(sessionStorage.getItem(DRAFT_STORAGE_KEY) ?? "{}")
          .colouringSelections,
      ).toEqual({ skinTone: "fair", eyeColour: "green" });
    });
    unmount();

    renderOnboarding(<OnboardingColouringPage />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Fair" }).getAttribute("aria-pressed"),
      ).toBe("true");
      expect(
        screen.getByRole("button", { name: "Green" }).getAttribute("aria-pressed"),
      ).toBe("true");
    });
    expect(
      screen.getByRole("button", { name: "Warm" }).getAttribute("aria-pressed"),
    ).toBe("false");
  });

  it("prefills a re-run from the saved profile when no local draft exists", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        profile: {
          id: "profile-1",
          ...body,
          weightKg: 64,
          ...colouring,
          temperature: "warm",
          value: "light",
          chroma: "bright",
          contrast: "low",
          colourSeason: "warm_spring",
          detectionSource: "photo",
          bodyShape: "hourglass",
        },
      }),
    } as Response);

    renderOnboarding(<OnboardingBodyPage />);

    await waitFor(() => {
      expect(
        (screen.getByRole("spinbutton", { name: /Height/ }) as HTMLInputElement)
          .value,
      ).toBe("170");
    });
    expect(fetchMock).toHaveBeenCalledWith("/api/profile");
    expect(
      JSON.parse(sessionStorage.getItem(DRAFT_STORAGE_KEY) ?? "{}"),
    ).toEqual({ body, colouring, colouringSource: "photo" });
  });

  it("prefers a local draft over the saved profile", async () => {
    sessionStorage.setItem(
      DRAFT_STORAGE_KEY,
      JSON.stringify({ body: { ...body, heightCm: 165 } }),
    );
    const fetchMock = vi.spyOn(globalThis, "fetch");

    renderOnboarding(<OnboardingBodyPage />);

    await waitFor(() => {
      expect(
        (screen.getByRole("spinbutton", { name: /Height/ }) as HTMLInputElement)
          .value,
      ).toBe("165");
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("opens colouring as the first step without a body draft", async () => {
    renderOnboarding(<OnboardingColouringPage />);

    expect(
      (await screen.findByText("Colouring")).getAttribute("aria-current"),
    ).toBe("step");
    expect(router.replace).not.toHaveBeenCalled();
  });
});

describe("edit mode", () => {
  beforeEach(() => {
    nav.search = new URLSearchParams("edit=1");
  });

  it("saves colouring straight to the analysis step without the progress bar", async () => {
    sessionStorage.setItem(
      DRAFT_STORAGE_KEY,
      JSON.stringify({ body, colouring, colouringSource: "manual" }),
    );

    renderOnboarding(<OnboardingColouringPage />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Fair" }).getAttribute("aria-pressed"),
      ).toBe("true");
    });
    expect(screen.queryByRole("navigation", { name: "Onboarding progress" })).toBeNull();
    expect(screen.getByText("Saving updates this week's three pieces.")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith("/onboarding/analysing?edit=1");
    });
  });

  it("saves measurements and returns Back to the profile", async () => {
    sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ body, colouring }));

    renderOnboarding(<OnboardingBodyPage />);

    await waitFor(() => {
      expect(
        (screen.getByRole("spinbutton", { name: /Bust/ }) as HTMLInputElement).value,
      ).toBe("90");
    });
    expect(screen.queryByRole("navigation", { name: "Onboarding progress" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Skip for now" })).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(router.push).toHaveBeenCalledWith("/profile");

    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith("/onboarding/analysing?edit=1");
    });
  });
});

describe("analysis persistence", () => {
  it("saves a body-and-colouring draft without posting season dimensions", async () => {
    vi.useFakeTimers();
    sessionStorage.setItem(
      DRAFT_STORAGE_KEY,
      JSON.stringify({ body, colouring, colouringSource: "photo" }),
    );
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue({ ok: true } as Response);

    renderOnboarding(<OnboardingAnalysingPage />);
    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(router.replace).not.toHaveBeenCalledWith("/onboarding/colouring");
    const [requestUrl, requestInit] = fetchMock.mock.calls[0];
    expect(requestUrl).toBe("/api/profile");
    expect(requestInit?.method).toBe("POST");
    const posted = JSON.parse(requestInit?.body as string);
    expect(posted).toEqual({ ...body, ...colouring, detectionSource: "photo" });
    for (const key of DIMENSION_KEYS) {
      expect(posted).not.toHaveProperty(key);
    }
    expect(router.replace).toHaveBeenCalledWith("/profile");
  });

  it("resumes a complete analysing draft and retries a failed save in place", async () => {
    vi.useFakeTimers();
    sessionStorage.setItem(
      DRAFT_STORAGE_KEY,
      JSON.stringify({ body, colouring }),
    );
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: "Invalid profile input" }),
      } as Response)
      .mockResolvedValueOnce({ ok: true } as Response)
      .mockResolvedValueOnce({ ok: true } as Response);

    renderOnboarding(<OnboardingAnalysingPage />);

    await act(async () => {
      await vi.runAllTimersAsync();
    });
    expect(screen.getByRole("alert").textContent).toMatch(
      "We couldn't save your profile. Please try again.",
    );
    expect(screen.queryByText("Invalid profile input")).toBeNull();
    expect(router.replace).not.toHaveBeenCalledWith("/onboarding/body");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(
      JSON.parse(sessionStorage.getItem(DRAFT_STORAGE_KEY) ?? "{}"),
    ).toEqual({ body, colouring });
    const [requestUrl, requestInit] = fetchMock.mock.calls[0];
    expect(requestUrl).toBe("/api/profile");
    expect(requestInit?.method).toBe("POST");
    expect(JSON.parse(requestInit?.body as string)).toEqual({
      ...body,
      ...colouring,
      detectionSource: "manual",
    });

    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(fetchMock.mock.calls[1][0]).toBe("/api/profile");
    expect(fetchMock.mock.calls[2][0]).toBe("/api/recs/weekly");
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(router.replace).toHaveBeenCalledWith("/profile");
    expect(sessionStorage.getItem(DRAFT_STORAGE_KEY)).toBe(JSON.stringify({}));
  });

  it("continues to the profile when the weekly pieces fail", async () => {
    vi.useFakeTimers();
    sessionStorage.setItem(
      DRAFT_STORAGE_KEY,
      JSON.stringify({ body, colouring }),
    );
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce({ ok: true } as Response)
      .mockRejectedValueOnce(new TypeError("Failed to fetch"));

    renderOnboarding(<OnboardingAnalysingPage />);
    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(fetchMock.mock.calls.map(([url]) => url)).toEqual([
      "/api/profile",
      "/api/recs/weekly",
    ]);
    expect(screen.queryByRole("alert")).toBeNull();
    expect(router.replace).toHaveBeenCalledWith("/profile");
  });

  it("shows a friendly error when the save can't reach the server", async () => {
    vi.useFakeTimers();
    sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ colouring }));
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new TypeError("Failed to fetch"));

    renderOnboarding(<OnboardingAnalysingPage />);
    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(screen.getByRole("alert").textContent).toMatch(
      "We couldn't save your profile.",
    );
    expect(screen.queryByText(/Failed to fetch/)).toBeNull();
    expect(router.replace).not.toHaveBeenCalled();
  });

  it("reveals the colour season once it is worked out", async () => {
    vi.useFakeTimers();
    sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ colouring }));
    vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true } as Response);

    renderOnboarding(<OnboardingAnalysingPage />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(screen.queryByText("Warm spring")).toBeNull();

    await act(async () => {
      await vi.runAllTimersAsync();
    });
    expect(screen.getByText("Warm spring")).toBeTruthy();
  });
});
