import { Prisma } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";
import { productUpdateSchema } from "@/lib/catalogue/schema";
import { getAdminActorState } from "@/lib/server/auth";
import { AccountDeletedError } from "@/lib/server/account-lifecycle";
import { updateCatalogueProduct } from "@/lib/server/catalogue";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await getAdminActorState();
  if (!auth.ok) {
    return NextResponse.json(
      { message: auth.message },
      { status: auth.status },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const parsed = productUpdateSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid product update", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  try {
    const { id } = await params;
    const product = await updateCatalogueProduct(auth.actor, id, parsed.data);
    return NextResponse.json({ product });
  } catch (error) {
    if (error instanceof AccountDeletedError) {
      return NextResponse.json(
        { message: "Account deletion is in progress" },
        { status: 409 },
      );
    }
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { message: "A product with this retailer URL already exists" },
        { status: 409 },
      );
    }
    throw error;
  }
}
