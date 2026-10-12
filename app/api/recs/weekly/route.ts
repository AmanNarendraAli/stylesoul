import { NextResponse } from "next/server";
import { requireUser } from "@/lib/server/require-user";
import { AccountDeletedError } from "@/lib/server/account-lifecycle";
import {
  getOrCreateWeeklyEditForUser,
  InsufficientCatalogueError,
  MissingStyleProfileError,
} from "@/lib/server/weekly-edit";

export async function GET() {
  const user = await requireUser();
  if (user instanceof NextResponse) return user;

  try {
    const weeklyEdit = await getOrCreateWeeklyEditForUser(user.id);
    return NextResponse.json({
      weeklyEdit: {
        id: weeklyEdit.id,
        weekStart: weeklyEdit.weekStart,
        items: weeklyEdit.items.map(({ position, product }) => ({
          position,
          product,
        })),
      },
    });
  } catch (error) {
    if (error instanceof MissingStyleProfileError) {
      return NextResponse.json(
        { message: "Complete your style profile first" },
        { status: 409 },
      );
    }
    if (error instanceof AccountDeletedError) {
      return NextResponse.json(
        { message: "Account deletion is in progress" },
        { status: 409 },
      );
    }
    if (error instanceof InsufficientCatalogueError) {
      return NextResponse.json(
        { message: "The catalogue does not yet contain three active products" },
        { status: 503 },
      );
    }
    throw error;
  }
}
