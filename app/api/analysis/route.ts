import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { message: "Photo analysis implementation lands in Phase 2." },
    { status: 501 },
  );
}
