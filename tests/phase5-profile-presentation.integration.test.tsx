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
    className,
  }: {
    href: string;
    children: ReactNode;
    prefetch?: boolean;
    className?: string;
  }) => (
    <a href={href} data-prefetch={String(prefetch)} className={className}>
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

const RERUN_NOTICE = /predates our 12-season analysis/i;

beforeEach(() => {
  mocks.redirect.mockReset();
  mocks.getUser.mockResolvedValue({
    data: { user: { id: "user-1", email: "person@example.com" } },
  });
  mocks.findStyleProfile.mockResolvedValue({ ...baseProfile });
});

afterEach(cleanup);

describe("profile silhouette framing", () => {
  it("presents the current heuristic as guidance rather than a verdict", async () => {
    render(await ProfilePage());

    expect(screen.getByText("Your silhouette today")).toBeTruthy();
    expect(screen.getByText("Hourglass")).toBeTruthy();
    expect(
      screen.getByText(
        "Based on your current measurements — styling guidance, not a verdict.",
      ),
    ).toBeTruthy();
    expect(
      screen.queryByRole("link", { name: "See this week's edit" }),
    ).toBeNull();
    expect(screen.getByRole("link", { name: "Re-run analysis" })).toBeTruthy();
  });
});

describe("profile style guide panel", () => {
  it("renders one style guide panel with colour and shape subsections and all six category headings", async () => {
    render(await ProfilePage());

    expect(
      screen.getByRole("heading", { level: 2, name: "Your style guide" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { level: 3, name: "Your colour guide" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { level: 3, name: "Your shape guide" }),
    ).toBeTruthy();

    for (const name of [
      "Colours to wear",
      "Accent colours",
      "Colours to avoid",
      "Shapes to wear",
      "Accent shapes and details",
      "Shapes to avoid",
    ]) {
      expect(screen.getByRole("heading", { level: 4, name })).toBeTruthy();
    }
  });

  it("places each category explainer beside its heading with mobile stacking", async () => {
    render(await ProfilePage());

    const guide = colourGuidance.warm_spring;
    const shapeGuide = shapeGuidance.hourglass;
    const categories: Array<[string, string]> = [
      ["Colours to wear", guide.coloursToWear.explainer],
      ["Accent colours", guide.accentColours.explainer],
      ["Colours to avoid", guide.coloursToAvoid.explainer],
      ["Shapes to wear", shapeGuide.shapesToWear.explainer],
      ["Accent shapes and details", shapeGuide.accentShapesAndDetails.explainer],
      ["Shapes to avoid", shapeGuide.shapesToAvoid.explainer],
    ];

    for (const [name, explainer] of categories) {
      const heading = screen.getByRole("heading", { level: 4, name });
      const row = heading.parentElement;
      expect(row).toBeTruthy();
      // Explainer copy lives in the same row as the heading…
      expect(row?.textContent).toContain(explainer);
      // …stacked on mobile, side-by-side from the sm breakpoint up.
      expect(row?.className).toContain("flex-col");
      expect(row?.className).toContain("sm:flex-row");
    }
  });

  it("shows archetype-specific rationale, labelled swatches, and concrete shape examples", async () => {
    render(await ProfilePage());

    const guide = colourGuidance.warm_spring;
    const shapeGuide = shapeGuidance.hourglass;

    for (const category of [
      guide.coloursToWear,
      guide.accentColours,
      guide.coloursToAvoid,
    ]) {
      expect(screen.getByText(category.rationale)).toBeTruthy();
      for (const swatch of category.swatches) {
        expect(screen.getByText(swatch.name)).toBeTruthy();
      }
    }

    for (const category of [
      shapeGuide.shapesToWear,
      shapeGuide.accentShapesAndDetails,
      shapeGuide.shapesToAvoid,
    ]) {
      expect(screen.getByText(category.rationale)).toBeTruthy();
      for (const example of category.examples) {
        expect(screen.getByText(example)).toBeTruthy();
      }
    }
  });

  it("keeps evidence-qualified framing for the styling conventions", async () => {
    render(await ProfilePage());

    expect(
      screen.getByText(/practitioner styling conventions, not scientifically validated/i),
    ).toBeTruthy();
  });

  it("orders the style guide before the raw measurements", async () => {
    render(await ProfilePage());

    const panelHeading = screen.getByRole("heading", {
      level: 2,
      name: "Your style guide",
    });
    const measurementsLabel = screen.getByText("Measurements");

    expect(
      panelHeading.compareDocumentPosition(measurementsLabel) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});

describe("profile legacy rerun invitation", () => {
  it("requires profiles without seasonal dimensions to rerun before showing guidance", async () => {
    mocks.findStyleProfile.mockResolvedValue({
      ...baseProfile,
      temperature: null,
      value: null,
      chroma: null,
      contrast: null,
    });

    render(await ProfilePage());

    expect(screen.getByText(RERUN_NOTICE)).toBeTruthy();
    expect(
      screen.getByRole("heading", { level: 2, name: "Reanalysis needed" }),
    ).toBeTruthy();
    expect(
      screen.queryByRole("heading", { level: 3, name: "Your colour guide" }),
    ).toBeNull();
    expect(screen.queryByText("Warm spring")).toBeNull();
  });

  it("omits the rerun notice once the four drape dimensions are stored", async () => {
    mocks.findStyleProfile.mockResolvedValue({
      ...baseProfile,
      temperature: "warm",
      value: "light",
      chroma: "bright",
      contrast: "medium",
    });

    render(await ProfilePage());

    expect(screen.queryByText(RERUN_NOTICE)).toBeNull();
  });
});

describe("profile with unrecognised stored archetypes", () => {
  it("shows a restrained reanalysis state instead of a fabricated guide for an unknown body shape", async () => {
    mocks.findStyleProfile.mockResolvedValue({
      ...baseProfile,
      bodyShape: "pear",
    });

    render(await ProfilePage());

    expect(
      screen.getByRole("heading", { name: "Reanalysis needed" }),
    ).toBeTruthy();
    expect(
      screen.queryByRole("heading", { name: "Your style guide" }),
    ).toBeNull();
    expect(screen.queryByText("Your silhouette today")).toBeNull();
    expect(screen.queryByText("Colour season")).toBeNull();
    expect(screen.queryByRole("link", { name: "Shop your edit" })).toBeNull();

    // Raw user-entered facts remain visible; no archetype is guessed.
    expect(screen.getByText("Measurements")).toBeTruthy();
    expect(screen.getByText("Colouring")).toBeTruthy();
    expect(screen.queryByText("Rectangle")).toBeNull();

    const rerun = screen.getByRole("link", { name: "Re-run analysis" });
    expect(rerun.getAttribute("href")).toBe("/onboarding/body");
    expect(rerun.className).toContain("bg-gold");
  });

  it("guards unknown colour seasons the same way", async () => {
    mocks.findStyleProfile.mockResolvedValue({
      ...baseProfile,
      colourSeason: "true_winter",
    });

    render(await ProfilePage());

    expect(
      screen.getByRole("heading", { name: "Reanalysis needed" }),
    ).toBeTruthy();
    expect(
      screen.queryByRole("heading", { name: "Your colour guide" }),
    ).toBeNull();
    expect(screen.queryByText("Warm Spring")).toBeNull();
  });
});

describe("profile actions", () => {
  it("offers a primary gold Shop your edit link to /products and keeps Re-run analysis secondary", async () => {
    render(await ProfilePage());

    const shop = screen.getByRole("link", { name: "Shop your edit" });
    expect(shop.getAttribute("href")).toBe("/products");
    expect(shop.className).toContain("bg-gold");
    expect(shop.className).toContain("text-charcoal");

    const rerun = screen.getByRole("link", { name: "Re-run analysis" });
    expect(rerun.getAttribute("href")).toBe("/onboarding/body");
    expect(rerun.className).not.toContain("bg-gold");
    expect(rerun.className).toContain("border");
  });
});
