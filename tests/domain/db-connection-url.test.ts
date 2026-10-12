// @vitest-environment node
import { describe, expect, it } from "vitest";
import { normalizePrismaConnectionUrl } from "@/lib/db/connection-url";

describe("Prisma connection URL", () => {
  it("enables PgBouncer mode for the Supabase transaction pooler", () => {
    const result = normalizePrismaConnectionUrl(
      "postgresql://user:secret@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres",
    );

    expect(new URL(result ?? "").searchParams.get("pgbouncer")).toBe("true");
  });

  it("preserves explicit pooler options and direct connections", () => {
    const configured = normalizePrismaConnectionUrl(
      "postgresql://user:secret@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=false&connection_limit=4",
    );
    const direct = normalizePrismaConnectionUrl(
      "postgresql://user:secret@db.example.supabase.co:5432/postgres",
    );

    expect(new URL(configured ?? "").searchParams.get("pgbouncer")).toBe("false");
    expect(new URL(configured ?? "").searchParams.get("connection_limit")).toBe("4");
    expect(new URL(direct ?? "").searchParams.has("pgbouncer")).toBe(false);
  });
});
