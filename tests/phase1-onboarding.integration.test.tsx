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

const detection = vi.hoisted(() => ({
  detectFromPhoto: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => router,
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
  weightKg: 64,
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
const dimensions = {
  temperature: "warm",
  value: "light",
  chroma: "bright",
  contrast: "medium",
};

const DRAPE_GROUP_NAMES = ["Temperature", "Depth", "Clarity", "Contrast"];

function renderOnboarding(page: ReactNode) {
  return render(<OnboardingProvider>{page}</OnboardingProvider>);
}

beforeEach(() => {
  vi.restoreAllMocks();
  sessionStorage.clear();
  router.push.mockReset();
  router.replace.mockReset();
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

  it("states that bust, waist, and hips drive the silhouette", () => {
    renderOnboarding(<OnboardingBodyPage />);

    expect(
      screen.getByText(/only bust, waist, and hips drive your reduced styling/),
    ).toBeTruthy();
    expect(
      screen.getByText("Not used for silhouette classification"),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Straight across shoulder points — stored with your measurements",
      ),
    ).toBeTruthy();
  });

  it("restores colouring and drape choices before deciding whether to redirect", async () => {
    sessionStorage.setItem(
      DRAFT_STORAGE_KEY,
      JSON.stringify({ body, colouring, dimensions, colouringSource: "photo" }),
    );

    renderOnboarding(<OnboardingColouringPage />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Fair" }).getAttribute("aria-pressed"),
      ).toBe("true");
      expect(
        screen.getByRole("button", { name: "Warm" }).getAttribute("aria-pressed"),
      ).toBe("true");
      expect(
        screen.getByRole("button", { name: "Green" }).getAttribute("aria-pressed"),
      ).toBe("true");
      expect(
        screen
          .getByRole("button", { name: "Golden blonde" })
          .getAttribute("aria-pressed"),
      ).toBe("true");
      expect(
        screen
          .getByRole("button", { name: "Warm — golds and corals" })
          .getAttribute("aria-pressed"),
      ).toBe("true");
      expect(
        screen
          .getByRole("button", { name: "Light — pale, delicate tones" })
          .getAttribute("aria-pressed"),
      ).toBe("true");
      expect(
        screen
          .getByRole("button", { name: "Bright — clear and vivid" })
          .getAttribute("aria-pressed"),
      ).toBe("true");
      expect(
        screen
          .getByRole("button", { name: "Medium contrast" })
          .getAttribute("aria-pressed"),
      ).toBe("true");
    });
    expect(router.replace).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith("/onboarding/analysing");
      const stored = JSON.parse(sessionStorage.getItem(DRAFT_STORAGE_KEY) ?? "{}");
      expect(stored.colouringSource).toBe("photo");
      expect(stored.dimensions).toEqual(dimensions);
    });
  });

  it("submits manually chosen drape dimensions into the draft", async () => {
    sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ body }));

    renderOnboarding(<OnboardingColouringPage />);

    for (const name of ["Fair", "Warm", "Green", "Golden blonde"]) {
      fireEvent.click(await screen.findByRole("button", { name }));
    }
    for (const name of [
      "Cool — blues and berry pinks",
      "Deep — rich, dark tones",
      "Soft — gently muted",
      "High contrast",
    ]) {
      fireEvent.click(screen.getByRole("button", { name }));
    }
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith("/onboarding/analysing");
      const stored = JSON.parse(sessionStorage.getItem(DRAFT_STORAGE_KEY) ?? "{}");
      expect(stored.colouring).toEqual(colouring);
      expect(stored.dimensions).toEqual({
        temperature: "cool",
        value: "deep",
        chroma: "soft",
        contrast: "high",
      });
      expect(stored.colouringSource).toBe("manual");
    });
  });

  it("labels uncalibrated photo matching as experimental", async () => {
    sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ body }));

    renderOnboarding(<OnboardingColouringPage />);

    expect(
      await screen.findByText("Try experimental photo suggestions"),
    ).toBeTruthy();
    expect(
      screen.getByText(/not yet calibrated on self-identified samples/i),
    ).toBeTruthy();
    expect(
      screen.getByText(/review and change every suggestion below/i),
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Detect from a photo" }),
    ).toBeTruthy();
  });

  it("guides mirror-and-daylight comparisons when no photo is chosen", async () => {
    sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ body }));

    renderOnboarding(<OnboardingColouringPage />);

    expect(
      await screen.findByText(/mirror in natural daylight/i),
    ).toBeTruthy();
    for (const name of DRAPE_GROUP_NAMES) {
      const group = screen.getByRole("group", { name });
      expect(group.querySelectorAll("button[aria-pressed]").length).toBe(3);
    }
    expect(document.querySelectorAll("[data-drape-preview]").length).toBe(0);
  });

  it("requires every swatch and drape comparison with described errors", async () => {
    sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ body }));

    renderOnboarding(<OnboardingColouringPage />);

    const photoInput = await screen.findByLabelText(
      "Choose a photo for colour suggestions",
    );
    expect(photoInput.tabIndex).toBe(-1);
    expect(photoInput.getAttribute("type")).toBe("file");

    const porcelain = screen.getByRole("button", { name: "Porcelain" });
    expect(porcelain.textContent).toContain("Porcelain");
    expect(porcelain.getAttribute("aria-pressed")).toBe("false");

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await waitFor(() => {
      for (const name of [
        "Skin tone",
        "Undertone",
        "Eye colour",
        "Hair colour",
        ...DRAPE_GROUP_NAMES,
      ]) {
        const group = screen.getByRole("group", { name });
        const errorId = group.getAttribute("aria-describedby");
        expect(errorId).toBeTruthy();
        expect(document.getElementById(errorId ?? "")?.textContent).toBeTruthy();
      }
    });
    expect(router.push).not.toHaveBeenCalled();
  });

  it("shows a transient local photo preview inside every drape choice and revokes it", async () => {
    sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ body }));
    let urlCounter = 0;
    const createObjectURL = vi.fn(() => `blob:preview-${++urlCounter}`);
    const revokeObjectURL = vi.fn();
    const urlWithObjectUrls = URL as typeof URL & {
      createObjectURL: typeof createObjectURL;
      revokeObjectURL: typeof revokeObjectURL;
    };
    urlWithObjectUrls.createObjectURL = createObjectURL;
    urlWithObjectUrls.revokeObjectURL = revokeObjectURL;
    detection.detectFromPhoto.mockResolvedValue({
      ok: false,
      reason: "no_face",
      message: "We could not find a face in that photo.",
    });

    try {
      const { unmount } = renderOnboarding(<OnboardingColouringPage />);

      const photoInput = await screen.findByLabelText(
        "Choose a photo for colour suggestions",
      );
      const photo = new File(["photo"], "portrait.jpg", { type: "image/jpeg" });
      fireEvent.change(photoInput, { target: { files: [photo] } });

      await waitFor(() => {
        const previews = document.querySelectorAll("img[data-drape-preview]");
        expect(previews.length).toBe(12);
        for (const preview of previews) {
          expect(preview.getAttribute("src")).toBe("blob:preview-1");
          expect(preview.getAttribute("aria-hidden")).toBe("true");
        }
      });
      expect(createObjectURL).toHaveBeenCalledWith(photo);
      expect(
        screen.getByText(/stays on this device only/i),
      ).toBeTruthy();

      // Re-selecting a photo replaces and revokes the previous preview URL.
      fireEvent.change(photoInput, { target: { files: [photo] } });
      await waitFor(() => {
        expect(revokeObjectURL).toHaveBeenCalledWith("blob:preview-1");
        expect(
          document
            .querySelector("img[data-drape-preview]")
            ?.getAttribute("src"),
        ).toBe("blob:preview-2");
      });

      // The draft never contains the photo or its object URL.
      expect(sessionStorage.getItem(DRAFT_STORAGE_KEY) ?? "").not.toContain(
        "blob:",
      );

      unmount();
      expect(revokeObjectURL).toHaveBeenCalledWith("blob:preview-2");
    } finally {
      Reflect.deleteProperty(URL, "createObjectURL");
      Reflect.deleteProperty(URL, "revokeObjectURL");
    }
  });

  it("marks reloaded photo colouring as corrected when a swatch changes", async () => {
    sessionStorage.setItem(
      DRAFT_STORAGE_KEY,
      JSON.stringify({ body, colouring, dimensions, colouringSource: "photo" }),
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
        dimensions,
        colouringSource: "photo",
      }),
    );

    renderOnboarding(<OnboardingColouringPage />);

    await waitFor(() => {
      expect(router.replace).toHaveBeenCalledWith("/onboarding/body");
      expect(
        screen.getByRole("button", { name: "Fair" }).getAttribute("aria-pressed"),
      ).toBe("true");
    });
    expect(
      JSON.parse(sessionStorage.getItem(DRAFT_STORAGE_KEY) ?? "{}"),
    ).toEqual({ colouring, dimensions, colouringSource: "photo" });
  });

  it("drops tampered dimensions instead of hydrating them", async () => {
    sessionStorage.setItem(
      DRAFT_STORAGE_KEY,
      JSON.stringify({
        body,
        colouring,
        dimensions: { ...dimensions, temperature: "scorching" },
      }),
    );

    renderOnboarding(<OnboardingColouringPage />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Fair" }).getAttribute("aria-pressed"),
      ).toBe("true");
    });
    expect(
      JSON.parse(sessionStorage.getItem(DRAFT_STORAGE_KEY) ?? "{}").dimensions,
    ).toBeUndefined();
    for (const name of DRAPE_GROUP_NAMES) {
      const group = screen.getByRole("group", { name });
      expect(group.querySelector('button[aria-pressed="true"]')).toBeNull();
    }
  });

  it("ignores drafts stored under the pre-dimension storage key", async () => {
    sessionStorage.setItem(
      "stylesoul.onboardingDraft.v3",
      JSON.stringify({ body, colouring, colouringSource: "photo" }),
    );

    renderOnboarding(<OnboardingColouringPage />);

    await waitFor(() => {
      expect(router.replace).toHaveBeenCalledWith("/onboarding/body");
    });
    expect(
      screen.getByRole("button", { name: "Fair" }).getAttribute("aria-pressed"),
    ).toBe("false");
  });

  it("clears malformed JSON instead of exposing or overwriting a draft", async () => {
    sessionStorage.setItem(DRAFT_STORAGE_KEY, "{not-json");

    renderOnboarding(<div />);

    await waitFor(() => {
      expect(sessionStorage.getItem(DRAFT_STORAGE_KEY)).toBe("{}");
    });
  });

  it("redirects a colouring reload only after confirming the body draft is absent", async () => {
    renderOnboarding(<OnboardingColouringPage />);

    await waitFor(() => {
      expect(router.replace).toHaveBeenCalledWith("/onboarding/body");
    });
  });
});

describe("analysis persistence", () => {
  it("sends a colouring-complete draft back to the drapes instead of fabricating dimensions", async () => {
    sessionStorage.setItem(
      DRAFT_STORAGE_KEY,
      JSON.stringify({ body, colouring }),
    );
    const fetchMock = vi.spyOn(globalThis, "fetch");

    renderOnboarding(<OnboardingAnalysingPage />);

    await waitFor(() => {
      expect(router.replace).toHaveBeenCalledWith("/onboarding/colouring");
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("resumes a complete analysing draft and retries a failed save in place", async () => {
    vi.useFakeTimers();
    sessionStorage.setItem(
      DRAFT_STORAGE_KEY,
      JSON.stringify({ body, colouring, dimensions }),
    );
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: "Temporary save failure" }),
      } as Response)
      .mockResolvedValueOnce({ ok: true } as Response)
      .mockResolvedValueOnce({ ok: true } as Response)
      .mockResolvedValueOnce({ ok: true } as Response);

    renderOnboarding(<OnboardingAnalysingPage />);

    await act(async () => {
      await vi.runAllTimersAsync();
    });
    expect(screen.getByText("Temporary save failure")).toBeTruthy();
    expect(router.replace).not.toHaveBeenCalledWith("/onboarding/body");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(
      JSON.parse(sessionStorage.getItem(DRAFT_STORAGE_KEY) ?? "{}"),
    ).toEqual({ body, colouring, dimensions });
    const [requestUrl, requestInit] = fetchMock.mock.calls[0];
    expect(requestUrl).toBe("/api/profile");
    expect(requestInit?.method).toBe("POST");
    expect(JSON.parse(requestInit?.body as string)).toEqual({
      ...body,
      ...colouring,
      ...dimensions,
      detectionSource: "manual",
    });

    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    await act(async () => {
      await vi.runAllTimersAsync();
    });

    const [retryUrl, retryRequestInit] = fetchMock.mock.calls[1];
    expect(retryUrl).toBe("/api/profile");
    expect(retryRequestInit?.method).toBe("POST");
    expect(JSON.parse(retryRequestInit?.body as string)).toEqual({
      ...body,
      ...colouring,
      ...dimensions,
      detectionSource: "manual",
    });
    expect(fetchMock.mock.calls[2][0]).toBe("/api/recs/weekly");
    expect(fetchMock.mock.calls[3][0]).toBe("/api/profile");
    expect(fetchMock).toHaveBeenCalledTimes(4);
    expect(router.replace).toHaveBeenCalledWith("/profile");
    expect(sessionStorage.getItem(DRAFT_STORAGE_KEY)).toBe(JSON.stringify({}));
  });

  it("retries weekly curation without saving the profile twice", async () => {
    vi.useFakeTimers();
    sessionStorage.setItem(
      DRAFT_STORAGE_KEY,
      JSON.stringify({ body, colouring, dimensions }),
    );
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce({ ok: true } as Response)
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: "Catalogue unavailable" }),
      } as Response)
      .mockResolvedValueOnce({ ok: true } as Response)
      .mockResolvedValueOnce({ ok: true } as Response);

    renderOnboarding(<OnboardingAnalysingPage />);
    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(screen.getByText("Catalogue unavailable")).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledTimes(2);

    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(fetchMock.mock.calls.map(([url]) => url)).toEqual([
      "/api/profile",
      "/api/recs/weekly",
      "/api/recs/weekly",
      "/api/profile",
    ]);
    expect(
      fetchMock.mock.calls.filter(([, init]) => init?.method === "POST"),
    ).toHaveLength(1);
    expect(router.replace).toHaveBeenCalledWith("/profile");
  });
});
