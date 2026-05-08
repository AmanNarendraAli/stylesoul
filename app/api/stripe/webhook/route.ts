import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { message: "Stripe webhook implementation lands in Phase 4." },
    { status: 501 },
  );
}
