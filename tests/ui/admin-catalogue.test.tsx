import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CatalogueManager } from "@/components/admin/CatalogueManager";
import { SEASON_LABELS, SHAPE_LABELS } from "@/lib/labels";

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

const okResponse = () =>
  new Response(JSON.stringify({ product }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

/** Finds a coverage cell by its row (shape) and column (season) headers. */
function coverageCell(shapeLabel: string, seasonLabel: string) {
  const table = screen.getByRole("table", { name: "Coverage" });
  const columns = within(table).getAllByRole("columnheader");
  const column = columns.indexOf(
    within(table).getByRole("columnheader", { name: seasonLabel }),
  );
  const row = within(table).getByRole("rowheader", { name: shapeLabel })
    .parentElement as HTMLElement;
  return within(row).getAllByRole("cell")[column - 1];
}

beforeEach(() => {
  router.refresh.mockReset();
  vi.restoreAllMocks();
  Element.prototype.scrollIntoView = vi.fn();
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
    fireEvent.change(screen.getByRole("textbox", { name: /^Description/ }), {
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

  it("shows the API's field-level validation messages next to their inputs", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          message: "Invalid product update",
          issues: [
            { path: ["occasionTags"], message: "Choose at least one" },
            { path: ["priceCents"], message: "Too big" },
          ],
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      ),
    );
    render(<CatalogueManager products={[product]} coverage={[]} />);

    fireEvent.click(screen.getByRole("button", { name: "Edit" }));
    fireEvent.click(screen.getByRole("button", { name: "Save changes" }));

    const occasions = await screen.findByRole("group", { name: /^Occasions/ });
    expect(
      document.getElementById(occasions.getAttribute("aria-describedby") ?? "")
        ?.textContent,
    ).toBe("Choose at least one");
    const price = screen.getByRole("spinbutton", { name: "Price (GBP)" });
    expect(price.getAttribute("aria-invalid")).toBe("true");
    expect(
      document.getElementById(price.getAttribute("aria-describedby") ?? "")
        ?.textContent,
    ).toBe("Too big");
    expect(
      screen.getByRole("textbox", { name: "Brand" }).getAttribute("aria-invalid"),
    ).toBeNull();
    expect(router.refresh).not.toHaveBeenCalled();
  });

  it("shows a retryable error when deactivation cannot reach the API", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network offline"));
    render(<CatalogueManager products={[product]} coverage={[]} />);

    fireEvent.click(screen.getByRole("button", { name: "Deactivate" }));

    expect((await screen.findByRole("alert")).textContent).toContain("Network offline");
    expect(router.refresh).not.toHaveBeenCalled();
  });

  it("moves to the form and focuses its first field when editing", () => {
    render(<CatalogueManager products={[product]} coverage={[]} />);

    fireEvent.click(screen.getByRole("button", { name: "Edit" }));

    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    const brand = screen.getByRole("textbox", { name: "Brand" }) as HTMLInputElement;
    expect(document.activeElement).toBe(brand);
    expect(brand.value).toBe("Example");
  });

  it("announces a saved confirmation after a successful update", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(okResponse());
    render(<CatalogueManager products={[product]} coverage={[]} />);

    const status = screen.getByRole("status");
    expect(status.getAttribute("aria-live")).toBe("polite");
    expect(status.textContent).toBe("");

    fireEvent.click(screen.getByRole("button", { name: "Edit" }));
    fireEvent.click(screen.getByRole("button", { name: "Save changes" }));

    await waitFor(() => expect(status.textContent).toBe("Saved"));
    expect(screen.getByRole("heading", { name: "Add a product" })).toBeTruthy();
  });

  it("does not deactivate a product when the admin cancels the confirmation", () => {
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(false);
    const fetchMock = vi.spyOn(globalThis, "fetch");
    render(<CatalogueManager products={[product]} coverage={[]} />);

    fireEvent.click(screen.getByRole("button", { name: "Deactivate" }));

    expect(confirm).toHaveBeenCalledOnce();
    expect(confirm.mock.calls[0][0]).toContain("Blue wrap dress");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(router.refresh).not.toHaveBeenCalled();
  });

  it("deactivates a product once the admin confirms", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(okResponse());
    render(<CatalogueManager products={[product]} coverage={[]} />);

    fireEvent.click(screen.getByRole("button", { name: "Deactivate" }));

    await waitFor(() => expect(router.refresh).toHaveBeenCalledOnce());
    const [url, request] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/admin/products/product-1");
    expect(JSON.parse(String(request?.body))).toEqual({ status: "inactive" });
  });

  it("activates an inactive product without asking for confirmation", async () => {
    const confirm = vi.spyOn(window, "confirm");
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(okResponse());
    render(
      <CatalogueManager products={[{ ...product, status: "inactive" }]} coverage={[]} />,
    );

    expect(screen.queryByRole("button", { name: "Deactivate" })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Activate" }));

    await waitFor(() => expect(router.refresh).toHaveBeenCalledOnce());
    const [url, request] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/admin/products/product-1");
    expect(JSON.parse(String(request?.body))).toEqual({ status: "active" });
    expect(confirm).not.toHaveBeenCalled();
  });

  it("shows active-product counts in a shape by season table", () => {
    render(
      <CatalogueManager
        products={[]}
        coverage={[
          { shape: "hourglass", season: "warm_spring", count: 14 },
          { shape: "triangle", season: "cool_summer", count: 15 },
        ]}
      />,
    );

    const table = screen.getByRole("table", { name: "Coverage" });
    expect(within(table).getAllByRole("rowheader")).toHaveLength(5);
    expect(within(table).getAllByRole("cell")).toHaveLength(60);
    expect(
      coverageCell(SHAPE_LABELS.hourglass, SEASON_LABELS.warm_spring).textContent,
    ).toBe("14");
    expect(
      coverageCell(SHAPE_LABELS.triangle, SEASON_LABELS.cool_summer).textContent,
    ).toBe("15");
    expect(
      coverageCell(SHAPE_LABELS.hourglass, SEASON_LABELS.cool_summer).textContent,
    ).toBe("0");
    expect(screen.getByText(/Minimum 15\./)).toBeTruthy();
  });
});
