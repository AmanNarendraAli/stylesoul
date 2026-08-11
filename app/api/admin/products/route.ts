import { Prisma } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";
import { productInputSchema } from "@/lib/catalogue/schema";
import { getAdminActorState } from "@/lib/server/auth";
import { AccountDeletedError } from "@/lib/server/account-lifecycle";
import {
  catalogueCoverage,
  createCatalogueProduct,
  listCatalogueProducts,
} from "@/lib/server/catalogue";

export async function GET() {
  const auth = await getAdminActorState();
  if (!auth.ok) {
    return NextResponse.json(
      { message: auth.message },
      { status: auth.status },
    );
  }

  const [products, coverage] = await Promise.all([
    listCatalogueProducts(),
    catalogueCoverage(),
  ]);
  return NextResponse.json({ products, coverage });
}

export async function POST(request: NextRequest) {
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

  const parsed = productInputSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid product", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  try {
    const product = await createCatalogueProduct(auth.actor, parsed.data);
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    if (error instanceof AccountDeletedError) {
      return NextResponse.json(
        { message: "Account deletion is in progress" },
        { status: 409 },
      );
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
