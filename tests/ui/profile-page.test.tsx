import type { ReactNode } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ProfilePage from "@/app/(app)/profile/page";
import { colourGuidance, shapeGuidance } from "@/lib/style-guidance/guidance";

const mocks = vi.hoisted(() => ({
  findStyleProfile: vi.fn(),
  getUser: vi.fn(),
  redirect: vi.fn(),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    prefetch,
  }: {
    href: string;
    children: ReactNode;
    prefetch?: boolean;
  }) => (
    <a href={href} data-prefetch={String(prefetch)}>
      {children}
    </a>
  ),
}));
vi.mock("next/navigation", () => ({ redirect: mocks.redirect }));
vi.mock("@/components/avatar/Avatar", () => ({ Avatar: () => null }));
vi.mock("@/lib/server/profile", () => ({
  findStyleProfile: mocks.findStyleProfile,
}));
vi.mock("@/lib/supabase/server", () => ({
  createClient: async () => ({ auth: { getUser: mocks.getUser } }),
}));

const baseProfile = {
  heightCm: 170,
  weightKg: 64,
  bustCm: 90,
  waistCm: 65,
  hipsCm: 90,
  shouldersCm: 40,
  bodyShape: "hourglass",
  skinTone: "fair",
  undertone: "warm",
  eyeColour: "green",
  hairColour: "golden_blonde",
  colourSeason: "warm_spring",
  temperature: "warm",
  value: "light",
  chroma: "bright",
  contrast: "medium",
};

beforeEach(() => {
  mocks.redirect.mockReset();
  mocks.getUser.mockResolvedValue({
    data: { user: { id: "user-1", email: "person@example.com" } },
  });
  mocks.findStyleProfile.mockResolvedValue({ ...baseProfile });
});

afterEach(cleanup);

describe("profile style guide", () => {
  it("leads with the season and a link to this week's pieces", async () => {
    render(await ProfilePage());

    expect(screen.getByText("Warm spring")).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: "See this week's three pieces" })
        .getAttribute("href"),
    ).toBe("/products");
    expect(screen.queryByText("person@example.com")).toBeNull();
  });

  it("places the colouring on each spectrum with a readable label", async () => {
    render(await ProfilePage());

    // The visible, non-decorative reading for each spectrum.
    const reading = (label: string) =>
      screen.getByText(label).closest("li")!.querySelector("p")!.textContent;
    expect(reading("Temperature")).toBe("Temperature:Warm");
    expect(reading("Depth")).toBe("Depth:Light");
    expect(reading("Clarity")).toBe("Clarity:Clear");
    expect(reading("Contrast")).toBe("Contrast:Low");
  });

  it("shows the colour and shape guides with their edit links", async () => {
    render(await ProfilePage());

    expect(
      screen.getByText(colourGuidance.warm_spring.coloursToWear.explainer),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: "Wear away from your face" }),
    ).toBeTruthy();
    expect(
      screen.getByText(shapeGuidance.hourglass.shapesToWear.explainer),
    ).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Go easy on" })).toBeTruthy();
    expect(
      screen.getByRole("link", { name: "Edit colours" }).getAttribute("href"),
    ).toBe("/onboarding/colouring?edit=1");
    expect(
      screen.getByRole("link", { name: "Edit measurements" }).getAttribute("href"),
    ).toBe("/onboarding/body?edit=1");
  });
});

describe("profile without measurements", () => {
  it("shows colour guidance and invites measurements instead of shape guidance", async () => {
    mocks.findStyleProfile.mockResolvedValue({
      ...baseProfile,
      heightCm: null,
      weightKg: null,
      bustCm: null,
      waistCm: null,
      hipsCm: null,
      shouldersCm: null,
      bodyShape: null,
    });

    render(await ProfilePage());

    expect(screen.queryByRole("heading", { name: "Update your profile" })).toBeNull();
    expect(
      screen.getByRole("heading", { name: "Your colour guide" }),
    ).toBeTruthy();
    expect(
      screen.queryByRole("heading", { name: "Your shape guide" }),
    ).toBeNull();
    expect(
      screen.getByRole("link", { name: "Add measurements" }).getAttribute("href"),
    ).toBe("/onboarding/body?edit=1");
    expect(screen.queryByRole("link", { name: "Edit measurements" })).toBeNull();
    expect(screen.queryByText("Measurements")).toBeNull();
    expect(screen.queryByText(/null/)).toBeNull();
  });

  it("lists only the measurements that exist", async () => {
    mocks.findStyleProfile.mockResolvedValue({ ...baseProfile, weightKg: null });

    render(await ProfilePage());

    expect(screen.getByText("Height")).toBeTruthy();
    expect(screen.queryByText("Weight")).toBeNull();
  });
});

describe("profile legacy update invitation", () => {
  it("requires profiles without seasonal dimensions to update before showing guidance", async () => {
    mocks.findStyleProfile.mockResolvedValue({
      ...baseProfile,
      temperature: null,
      value: null,
      chroma: null,
      contrast: null,
    });

    render(await ProfilePage());

    expect(
      screen.getByRole("heading", { level: 2, name: "Update your profile" }),
    ).toBeTruthy();
    expect(
      screen.queryByRole("heading", { name: "Your colour guide" }),
    ).toBeNull();
    expect(screen.queryByText("Warm spring")).toBeNull();
  });
});

describe("profile with unrecognised stored results", () => {
  it("asks for an update instead of guessing a guide for an unknown body shape", async () => {
    mocks.findStyleProfile.mockResolvedValue({
      ...baseProfile,
      bodyShape: "pear",
    });

    render(await ProfilePage());

    expect(
      screen.getByRole("heading", { name: "Update your profile" }),
    ).toBeTruthy();
    expect(
      screen.queryByRole("heading", { name: "Your colour guide" }),
    ).toBeNull();
    expect(
      screen.queryByRole("link", { name: "See this week's three pieces" }),
    ).toBeNull();

    // Raw user-entered facts remain visible; no shape is guessed.
    expect(screen.getByText("Measurements")).toBeTruthy();
    expect(screen.getByText("Colouring")).toBeTruthy();
    expect(screen.queryByText("Rectangle")).toBeNull();

    expect(
      screen.getByRole("link", { name: "Edit colours" }).getAttribute("href"),
    ).toBe("/onboarding/colouring?edit=1");
    expect(
      screen.getByRole("link", { name: "Edit measurements" }).getAttribute("href"),
    ).toBe("/onboarding/body?edit=1");
  });

  it("guards unknown colour seasons the same way", async () => {
    mocks.findStyleProfile.mockResolvedValue({
      ...baseProfile,
      colourSeason: "true_winter",
    });

    render(await ProfilePage());

    expect(
      screen.getByRole("heading", { name: "Update your profile" }),
    ).toBeTruthy();
    expect(
      screen.queryByRole("heading", { name: "Your colour guide" }),
    ).toBeNull();
  });
});
