import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import OnboardingBodyPage from "@/app/(app)/onboarding/body/page";
import { OnboardingProvider } from "@/app/(app)/onboarding/OnboardingProvider";
import { ONBOARDING_DRAFT_STORAGE_KEY as DRAFT_STORAGE_KEY } from "@/lib/onboarding-draft";

const router = vi.hoisted(() => ({ push: vi.fn(), replace: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => router,
  useSearchParams: () => new URLSearchParams(),
}));

const colouring = {
  skinTone: "fair",
  undertone: "warm",
  eyeColour: "green",
  hairColour: "brown_black",
};

const field = (name: RegExp) => screen.getByRole("spinbutton", { name }) as HTMLInputElement;
const type = (name: RegExp, value: string) =>
  fireEvent.change(field(name), { target: { value } });
const storedBody = () => JSON.parse(sessionStorage.getItem(DRAFT_STORAGE_KEY) ?? "{}").body;

function renderBody(body?: object) {
  sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ colouring, body }));
  return render(
    <OnboardingProvider>
      <OnboardingBodyPage />
    </OnboardingProvider>,
  );
}

beforeEach(() => {
  document.cookie = "stylesoul_units=; path=/; max-age=0";
  sessionStorage.clear();
  router.push.mockReset();
});

afterEach(cleanup);

describe("measurement units", () => {
  it("defaults to inches and saves centimetres, with height in feet and inches", async () => {
    renderBody();

    expect(screen.getByRole("button", { name: "in" }).getAttribute("aria-pressed")).toBe("true");
    type(/Bust/, "34");
    type(/Waist/, "27.5");
    type(/Hips/, "38");
    type(/Height, feet/, "5");
    type(/Height, inches/, "6");
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await waitFor(() => {
      expect(storedBody()).toEqual({ bustCm: 86, waistCm: 70, hipsCm: 97, heightCm: 168 });
    });
  });

  it("converts what was typed when switching units and remembers the choice", async () => {
    renderBody();
    fireEvent.click(screen.getByRole("button", { name: "cm" }));
    type(/Bust/, "90");
    type(/Height/, "170");

    fireEvent.click(screen.getByRole("button", { name: "in" }));

    expect(field(/Bust/).value).toBe("35.5");
    expect(field(/Height, feet/).value).toBe("5");
    expect(field(/Height, inches/).value).toBe("7");
    expect(document.cookie).toContain("stylesoul_units=in");
  });

  it("states the allowed range in the chosen unit", async () => {
    renderBody();
    type(/Bust/, "10");
    type(/Waist/, "28");
    type(/Hips/, "38");
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(await screen.findByText("Enter a bust measurement between 23.5 and 71 in")).toBeTruthy();
    expect(router.push).not.toHaveBeenCalled();
  });

  it("shows saved centimetres in inches", async () => {
    renderBody({ bustCm: 86, waistCm: 70, hipsCm: 97, heightCm: 168 });

    await waitFor(() => expect(field(/Bust/).value).toBe("34"));
    expect(field(/Hips/).value).toBe("38");
    expect(field(/Height, feet/).value).toBe("5");
    expect(field(/Height, inches/).value).toBe("6");
  });
});
