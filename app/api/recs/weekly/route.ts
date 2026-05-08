import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "Weekly recommendation implementation lands in Phase 3." },
    { status: 501 },
  );
}
