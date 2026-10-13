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
  useSearchParams: () => new URLSearchParams(),
}));
// The guided camera has its own tests; here it just hands back a photo.
vi.mock("@/components/onboarding/CameraCapture", () => ({
  CameraCapture: ({
    onCapture,
    onPickManually,
  }: {
    onCapture: (file: File) => void;
    onPickManually: () => void;
  }) => (
    <div role="dialog">
      <button
        type="button"
        onClick={() =>
          onCapture(new File(["photo"], "camera-photo.jpg", { type: "image/jpeg" }))
        }
      >
        Capture
      </button>
      <button type="button" onClick={onPickManually}>
        Pick your colours instead
      </button>
    </div>
  ),
}));

let detectionGate: PromiseWithResolvers<PhotoDetectionOutcome>;

beforeEach(() => {
  sessionStorage.clear();
  vi.stubGlobal("navigator", {
    ...navigator,
    mediaDevices: { getUserMedia: vi.fn() },
  });
  detectionGate = Promise.withResolvers<PhotoDetectionOutcome>();
  mocks.detectFromPhoto.mockReturnValue(detectionGate.promise);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function renderColouringPage() {
  return render(
    <OnboardingProvider>
      <OnboardingColouringPage />
    </OnboardingProvider>,
  );
}

async function takePhoto() {
  fireEvent.click(await screen.findByRole("button", { name: "Take a photo" }));
  fireEvent.click(screen.getByRole("button", { name: "Capture" }));
}

describe("photo entry point", () => {
  it("offers the camera and a manual path, with no file upload", async () => {
    const { container } = renderColouringPage();

    expect(await screen.findByRole("button", { name: "Take a photo" })).toBeTruthy();
    expect(container.querySelector('input[type="file"]')).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Pick your colours yourself" }));
    expect(document.activeElement).toBe(
      screen.getByRole("heading", { name: "Your colouring" }),
    );
  });

  it("moves to the swatches when the camera can't be used", async () => {
    renderColouringPage();
    fireEvent.click(await screen.findByRole("button", { name: "Take a photo" }));

    fireEvent.click(screen.getByRole("button", { name: "Pick your colours instead" }));

    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(document.activeElement).toBe(
      screen.getByRole("heading", { name: "Your colouring" }),
    );
  });

  it("hides the camera and leads with the swatches without getUserMedia", async () => {
    vi.stubGlobal("navigator", { ...navigator, mediaDevices: undefined });
    renderColouringPage();

    expect(await screen.findByText(/need a camera/)).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Take a photo" })).toBeNull();
    expect(screen.getByRole("button", { name: "Porcelain" })).toBeTruthy();
  });

  it("points to the swatches when detection fails", async () => {
    renderColouringPage();
    await takePhoto();

    detectionGate.resolve({
      ok: false,
      kind: "quality",
      message: "We could not find a face in that photo.",
    });

    expect((await screen.findByRole("alert")).textContent).toMatch(
      /could not find a face.*pick your colours below/,
    );
  });
});

describe("photo analysis progress", () => {
  it("preserves manual swatches selected during detection and completes cleanly", async () => {
    renderColouringPage();
    await takePhoto();

    await screen.findByRole("status");
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
            name: "Take a photo",
          }) as HTMLButtonElement
        ).disabled,
      ).toBe(false);
    });
    expect(porcelain.getAttribute("aria-pressed")).toBe("true");
    expect(
      screen
        .getByText(
          "We've filled these in from your photo. Change anything that looks wrong.",
        )
        .closest("[aria-live]")
        ?.getAttribute("aria-live"),
    ).toBe("polite");
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

describe("photo pre-fill", () => {
  it("keeps the photo's face measurements in the draft", async () => {
    renderColouringPage();
    await takePhoto();
    detectionGate.resolve({
      ok: true,
      source: "photo",
      face: { length: 0.3, lines: 0.8 },
      detected: {
        skinTone: { value: "medium", confidence: 0.9 },
        undertone: { value: "warm", confidence: 0.9 },
        eyeColour: { value: "hazel", confidence: 0.9 },
        hairColour: { value: "black", confidence: 0.9 },
      },
    });
    await screen.findByText(/We've filled these in from your photo/);

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await waitFor(() => {
      const draft = JSON.parse(sessionStorage.getItem(ONBOARDING_DRAFT_STORAGE_KEY) ?? "{}");
      expect(draft.face).toEqual({ length: 0.3, lines: 0.8 });
    });
  });

  it("names the groups the photo couldn't fill and moves to the swatches", async () => {
    renderColouringPage();
    await takePhoto();

    detectionGate.resolve({
      ok: true,
      source: "photo",
      detected: {
        skinTone: { value: "medium", confidence: 0.9 },
        eyeColour: { value: "hazel", confidence: 0.9 },
      },
    });

    expect(
      await screen.findByText(
        "We've filled these in from your photo. Pick your undertone and hair colour too.",
      ),
    ).toBeTruthy();
    expect(document.activeElement).toBe(
      screen.getByRole("heading", { name: "Your colouring" }),
    );
  });

  it("marks photo picks until the user changes them", async () => {
    renderColouringPage();
    await takePhoto();

    detectionGate.resolve({
      ok: true,
      source: "photo",
      detected: {
        skinTone: { value: "medium", confidence: 0.9 },
        undertone: { value: "warm", confidence: 0.9 },
      },
    });

    const photoMarks = () =>
      screen
        .getAllByRole("button")
        .filter((button) =>
          button.getAttribute("aria-describedby")?.endsWith("-photo"),
        )
        .map((button) => button.getAttribute("aria-label"));

    await waitFor(() => expect(photoMarks()).toEqual(["Medium", "Warm"]));
    expect(screen.getAllByText("From your photo")).toHaveLength(2);

    fireEvent.click(screen.getByRole("button", { name: "Light" }));

    expect(photoMarks()).toEqual(["Warm"]);
  });
});
