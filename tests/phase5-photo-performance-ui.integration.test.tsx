import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import OnboardingColouringPage from "@/app/(app)/onboarding/colouring/page";
import { OnboardingProvider } from "@/app/(app)/onboarding/OnboardingProvider";
import type { PhotoDetectionOutcome } from "@/components/onboarding/colour-detection-client";
import { ONBOARDING_DRAFT_STORAGE_KEY } from "@/lib/onboarding-draft";

const mocks = vi.hoisted(() => ({
  detectFromPhoto: vi.fn(),
  replace: vi.fn(),
  push: vi.fn(),
}));

vi.mock("@/components/onboarding/colour-detection-client", () => ({
  detectFromPhoto: mocks.detectFromPhoto,
}));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mocks.replace, push: mocks.push }),
}));

let detectionGate: PromiseWithResolvers<PhotoDetectionOutcome>;

beforeEach(() => {
  vi.clearAllMocks();
  sessionStorage.clear();
  sessionStorage.setItem(
    ONBOARDING_DRAFT_STORAGE_KEY,
    JSON.stringify({
      body: {
        heightCm: 170,
        bustCm: 90,
        waistCm: 65,
        hipsCm: 92,
        shouldersCm: 40,
      },
    }),
  );
  detectionGate = Promise.withResolvers<PhotoDetectionOutcome>();
  mocks.detectFromPhoto.mockReturnValue(detectionGate.promise);
});

afterEach(() => {
  cleanup();
});

function renderColouringPage() {
  render(
    <OnboardingProvider>
      <OnboardingColouringPage />
    </OnboardingProvider>,
  );
}

function choosePhoto() {
  fireEvent.change(
    screen.getByLabelText("Choose a photo for colour suggestions"),
    {
      target: {
        files: [new File(["photo"], "portrait.jpg", { type: "image/jpeg" })],
      },
    },
  );
}

describe("photo analysis progress", () => {
  it("re-checks the visible server-fallback consent while analysis is running", async () => {
    renderColouringPage();
    const consent = await screen.findByRole("checkbox", {
      name: /Allow server fallback/,
    });
    fireEvent.click(consent);
    choosePhoto();
    await screen.findByRole("status");

    fireEvent.click(consent);

    const getCurrentConsent = mocks.detectFromPhoto.mock.calls[0][1] as () => boolean;
    expect(getCurrentConsent()).toBe(false);
  });

  it("preserves manual swatches selected during detection and completes cleanly", async () => {
    renderColouringPage();
    await screen.findByLabelText("Choose a photo for colour suggestions");
    choosePhoto();

    expect((await screen.findByRole("status")).textContent).toContain(
      "First-time analysis downloads its face-landmark files",
    );
    const porcelain = screen.getByRole("button", { name: "Porcelain" });
    expect((porcelain as HTMLButtonElement).disabled).toBe(false);
    fireEvent.click(porcelain);
    expect(porcelain.getAttribute("aria-pressed")).toBe("true");

    detectionGate.resolve({
      ok: true,
      source: "photo",
      detected: {
        skinTone: { value: "medium", confidence: 0.9 },
        undertone: { value: "warm", confidence: 0.9 },
        eyeColour: { value: "hazel", confidence: 0.9 },
        hairColour: { value: "black", confidence: 0.9 },
      },
    });

    await waitFor(() => {
      expect(screen.queryByRole("status")).toBeNull();
      expect(
        (
          screen.getByRole("button", {
            name: "Detect from a photo",
          }) as HTMLButtonElement
        ).disabled,
      ).toBe(false);
    });
    expect(porcelain.getAttribute("aria-pressed")).toBe("true");
    expect(
      screen.getByRole("button", { name: "Medium" }).getAttribute("aria-pressed"),
    ).toBe("false");
    for (const name of ["Warm", "Hazel", "Black"]) {
      expect(
        screen.getByRole("button", { name }).getAttribute("aria-pressed"),
      ).toBe("true");
    }
  });
});
