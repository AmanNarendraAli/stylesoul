import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { createClient } from "@/lib/supabase/server";
import {
  deriveStyleProfile,
  styleProfileInputSchema,
} from "@/lib/style-profile/schema";

export async function GET() {
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const profile = await prisma.styleProfile.findUnique({
    where: { userId: user.id },
  });

  if (!profile) {
    return NextResponse.json({ message: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json({ profile });
}

export async function POST(request: NextRequest) {
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!user.email) {
    return NextResponse.json(
      { message: "Authenticated user is missing an email address" },
      { status: 400 },
    );
  }

  const payload = await request.json();
  const parsed = styleProfileInputSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid profile input", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const profileData = deriveStyleProfile(parsed.data);

  await prisma.user.upsert({
    where: { id: user.id },
    create: {
      id: user.id,
      email: user.email,
    },
    update: {
      email: user.email,
    },
  });

  const profile = await prisma.styleProfile.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      ...profileData,
    },
    update: profileData,
  });

  return NextResponse.json({ profile });
}

async function getAuthenticatedUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
