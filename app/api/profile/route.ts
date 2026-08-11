import { NextResponse, type NextRequest } from "next/server";
import {
  styleProfileInputSchema,
} from "@/lib/style-profile/schema";
import {
  findStyleProfile,
  saveStyleProfile,
} from "@/lib/server/profile";
import { getAuthenticatedUserState } from "@/lib/server/auth";
import { AccountDeletedError } from "@/lib/server/account-lifecycle";
import { recordFunnelEvent } from "@/lib/server/funnel";

export async function GET() {
  const auth = await getAuthenticatedUserState();
  if (!auth.available) {
    return NextResponse.json(
      { message: "Authentication unavailable" },
      { status: 503 },
    );
  }
  const { user } = auth;
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const profile = await findStyleProfile(user.id);

  if (!profile) {
    return NextResponse.json({ message: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json({ profile });
}

export async function POST(request: NextRequest) {
  const auth = await getAuthenticatedUserState();
  if (!auth.available) {
    return NextResponse.json(
      { message: "Authentication unavailable" },
      { status: 503 },
    );
  }
  const { user } = auth;
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!user.email) {
    return NextResponse.json(
      { message: "Authenticated user is missing an email address" },
      { status: 400 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const parsed = styleProfileInputSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid profile input", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  try {
    const profile = await saveStyleProfile({
      userId: user.id,
      email: user.email,
      input: parsed.data,
    });
    await recordFunnelEvent({
      userId: user.id,
      name: "analysis_complete",
      occurredAt: profile.createdAt,
    });

    return NextResponse.json({ profile });
  } catch (error) {
    if (error instanceof AccountDeletedError) {
      return NextResponse.json(
        { message: "Account deletion is in progress" },
        { status: 409 },
      );
    }
    throw error;
  }
}

