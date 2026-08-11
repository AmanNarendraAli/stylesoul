import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CatalogueManager } from "@/components/admin/CatalogueManager";

const router = vi.hoisted(() => ({ refresh: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => router,
}));

const product = {
  id: "product-1",
  brand: "Example",
  title: "Blue wrap dress",
  description: "Original description",
  imageUrl: "https://images.example.com/dress.jpg",
  productUrl: "https://shop.example.com/dress",
  isAffiliate: false,
  priceCents: 8900,
  currency: "GBP",
  status: "active",
  eligibleShapes: ["hourglass"],
  eligibleSeasons: ["cool_summer"],
  garmentCategory: "dresses",
  occasionTags: ["work"],
  priceTier: "mid",
  createdAt: "2026-07-14T00:00:00.000Z",
  updatedAt: "2026-07-14T00:00:00.000Z",
};

beforeEach(() => {
  router.refresh.mockReset();
  vi.restoreAllMocks();
});

afterEach(() => {
  cleanup();
});

describe("catalogue admin interactions", () => {
  it("sends null when an admin clears a product description", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ product: { ...product, description: null } }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    render(<CatalogueManager products={[product]} coverage={[]} />);

    fireEvent.click(screen.getByRole("button", { name: "Edit" }));
    fireEvent.change(screen.getByRole("textbox", { name: "Description" }), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save changes" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    const [, request] = fetchMock.mock.calls[0];
    expect(JSON.parse(String(request?.body))).toMatchObject({
      description: null,
    });
    expect(router.refresh).toHaveBeenCalledOnce();
  });

  it("shows a retryable error when deactivation cannot reach the API", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network offline"));
    render(<CatalogueManager products={[product]} coverage={[]} />);

    fireEvent.click(screen.getByRole("button", { name: "Deactivate" }));

    expect((await screen.findByRole("alert")).textContent).toContain("Network offline");
    expect(router.refresh).not.toHaveBeenCalled();
  });

  it("states catalogue coverage thresholds without relying on colour", () => {
    render(
      <CatalogueManager
        products={[]}
        coverage={[
          { shape: "hourglass", season: "warm_spring", count: 14 },
          { shape: "triangle", season: "cool_summer", count: 15 },
        ]}
      />,
    );

    expect(screen.getByText("Below 15-item minimum")).toBeTruthy();
    expect(screen.getByText("Meets 15-item minimum")).toBeTruthy();
  });
});
