// @vitest-environment node
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getAdminActorState: vi.fn(),
  getAuthenticatedUserState: vi.fn(),
  listCatalogueProducts: vi.fn(),
  catalogueCoverage: vi.fn(),
  createCatalogueProduct: vi.fn(),
  updateCatalogueProduct: vi.fn(),
  getOrCreateWeeklyEditForUser: vi.fn(),
}));

vi.mock("@/lib/server/auth", () => ({
  getAdminActorState: mocks.getAdminActorState,
  getAuthenticatedUserState: mocks.getAuthenticatedUserState,
}));
vi.mock("@/lib/server/catalogue", () => ({
  listCatalogueProducts: mocks.listCatalogueProducts,
  catalogueCoverage: mocks.catalogueCoverage,
  createCatalogueProduct: mocks.createCatalogueProduct,
  updateCatalogueProduct: mocks.updateCatalogueProduct,
}));
vi.mock("@/lib/server/weekly-edit", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/server/weekly-edit")>();
  return {
    ...actual,
    getOrCreateWeeklyEditForUser: mocks.getOrCreateWeeklyEditForUser,
  };
});

import {
  GET as listProducts,
  POST as createProduct,
} from "@/app/api/admin/products/route";
import { PATCH as updateProduct } from "@/app/api/admin/products/[id]/route";
import { GET as readWeeklyEdit } from "@/app/api/recs/weekly/route";
import {
  InsufficientCatalogueError,
  MissingStyleProfileError,
} from "@/lib/server/weekly-edit";
import { AccountDeletedError } from "@/lib/server/account-lifecycle";

const actor = { id: "admin-1", email: "admin@example.com" };
const validProduct = {
  brand: "Example",
  title: "Blue wrap dress",
  description: "A test product",
  imageUrl: "https://images.example.com/dress.jpg",
  productUrl: "https://shop.example.com/dress",
  priceCents: 8900,
  currency: "INR",
  status: "active",
  eligibleShapes: ["hourglass"],
  eligibleSeasons: ["cool_summer"],
  garmentCategory: "dresses",
  occasionTags: ["work"],
  priceTier: "mid",
};

beforeEach(() => {
  mocks.getAdminActorState.mockResolvedValue({ ok: true, actor });
  mocks.getAuthenticatedUserState.mockResolvedValue({
    available: true,
    user: { id: "user-1" },
  });
  mocks.listCatalogueProducts.mockResolvedValue([]);
  mocks.catalogueCoverage.mockResolvedValue([]);
  mocks.createCatalogueProduct.mockResolvedValue({ id: "product-1", ...validProduct });
  mocks.updateCatalogueProduct.mockResolvedValue({ id: "product-1", ...validProduct });
  mocks.getOrCreateWeeklyEditForUser.mockReset();
});

describe("admin catalogue API", () => {
  it("rejects catalogue reads and writes without the admin role", async () => {
    mocks.getAdminActorState.mockResolvedValue({
      ok: false,
      status: 403,
      message: "Admin role required",
    });

    const readResponse = await listProducts();
    const writeResponse = await createProduct(
      new NextRequest("http://localhost/api/admin/products", {
        method: "POST",
        body: JSON.stringify(validProduct),
      }),
    );

    expect(readResponse.status).toBe(403);
    expect(writeResponse.status).toBe(403);
    expect(mocks.createCatalogueProduct).not.toHaveBeenCalled();
  });

  it("rejects non-HTTPS catalogue URLs", async () => {
    const response = await createProduct(
      new NextRequest("http://localhost/api/admin/products", {
        method: "POST",
        body: JSON.stringify({
          ...validProduct,
          productUrl: "http://shop.example.com/dress",
        }),
      }),
    );

    expect(response.status).toBe(400);
    expect(mocks.createCatalogueProduct).not.toHaveBeenCalled();
  });

  it("creates and updates validated products as the authenticated admin", async () => {
    const createResponse = await createProduct(
      new NextRequest("http://localhost/api/admin/products", {
        method: "POST",
        body: JSON.stringify(validProduct),
      }),
    );
    const updateResponse = await updateProduct(
      new NextRequest("http://localhost/api/admin/products/product-1", {
        method: "PATCH",
        body: JSON.stringify({ status: "inactive" }),
      }),
      { params: Promise.resolve({ id: "product-1" }) },
    );

    expect(createResponse.status).toBe(201);
    expect(mocks.createCatalogueProduct).toHaveBeenCalledWith(actor, validProduct);
    expect(updateResponse.status).toBe(200);
    expect(mocks.updateCatalogueProduct).toHaveBeenCalledWith(actor, "product-1", {
      status: "inactive",
    });
  });

  it("maps duplicate retailer URLs to a conflict for creates and updates", async () => {
    const duplicate = new Prisma.PrismaClientKnownRequestError(
      "Unique constraint failed",
      { code: "P2002", clientVersion: "6.19.3" },
    );
    mocks.createCatalogueProduct.mockRejectedValueOnce(duplicate);
    mocks.updateCatalogueProduct.mockRejectedValueOnce(duplicate);

    const createResponse = await createProduct(
      new NextRequest("http://localhost/api/admin/products", {
        method: "POST",
        body: JSON.stringify(validProduct),
      }),
    );
    const updateResponse = await updateProduct(
      new NextRequest("http://localhost/api/admin/products/product-1", {
        method: "PATCH",
        body: JSON.stringify({
          productUrl: "https://shop.example.com/duplicate",
        }),
      }),
      { params: Promise.resolve({ id: "product-1" }) },
    );

    expect(createResponse.status).toBe(409);
    expect(updateResponse.status).toBe(409);
    await expect(createResponse.json()).resolves.toEqual({
      message: "A product with this retailer URL already exists",
    });
    await expect(updateResponse.json()).resolves.toEqual({
      message: "A product with this retailer URL already exists",
    });
  });

  it("rejects admin mutations after actor deletion begins", async () => {
    mocks.createCatalogueProduct.mockRejectedValueOnce(
      new AccountDeletedError(),
    );
    mocks.updateCatalogueProduct.mockRejectedValueOnce(
      new AccountDeletedError(),
    );

    const createResponse = await createProduct(
      new NextRequest("http://localhost/api/admin/products", {
        method: "POST",
        body: JSON.stringify(validProduct),
      }),
    );
    const updateResponse = await updateProduct(
      new NextRequest("http://localhost/api/admin/products/product-1", {
        method: "PATCH",
        body: JSON.stringify({ status: "inactive" }),
      }),
      { params: Promise.resolve({ id: "product-1" }) },
    );

    expect(createResponse.status).toBe(409);
    expect(updateResponse.status).toBe(409);
    await expect(createResponse.json()).resolves.toEqual({
      message: "Account deletion is in progress",
    });
    await expect(updateResponse.json()).resolves.toEqual({
      message: "Account deletion is in progress",
    });
  });

  it("accepts null to clear an optional description", async () => {
    const response = await updateProduct(
      new NextRequest("http://localhost/api/admin/products/product-1", {
        method: "PATCH",
        body: JSON.stringify({ description: null }),
      }),
      { params: Promise.resolve({ id: "product-1" }) },
    );

    expect(response.status).toBe(200);
    expect(mocks.updateCatalogueProduct).toHaveBeenCalledWith(
      actor,
      "product-1",
      { description: null },
    );
  });
});

describe("weekly recommendation API", () => {
  it("rejects unauthenticated requests before reading an edit", async () => {
    mocks.getAuthenticatedUserState.mockResolvedValue({
      available: true,
      user: null,
    });

    const response = await readWeeklyEdit();

    expect(response.status).toBe(401);
    expect(mocks.getOrCreateWeeklyEditForUser).not.toHaveBeenCalled();
  });

  it("returns only the authenticated user's stable edit", async () => {
    mocks.getOrCreateWeeklyEditForUser.mockResolvedValue({
      id: "edit-1",
      userId: "user-1",
      weekStart: new Date("2026-07-13T00:00:00.000Z"),
      createdAt: new Date(),
      items: [
        {
          position: 0,
          product: { id: "product-1", title: "Blue wrap dress" },
        },
      ],
    });

    const response = await readWeeklyEdit();
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(mocks.getOrCreateWeeklyEditForUser).toHaveBeenCalledWith("user-1");
    expect(payload.weeklyEdit.id).toBe("edit-1");
    expect(payload.weeklyEdit).not.toHaveProperty("userId");
  });

  it.each([
    [new MissingStyleProfileError(), 409],
    [new AccountDeletedError(), 409],
    [new InsufficientCatalogueError(), 503],
  ])("maps expected recommendation failures", async (error, status) => {
    mocks.getOrCreateWeeklyEditForUser.mockRejectedValue(error);

    const response = await readWeeklyEdit();

    expect(response.status).toBe(status);
  });
});
