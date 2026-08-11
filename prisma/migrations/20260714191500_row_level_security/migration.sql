-- Lock down personal and catalogue tables exposed through Supabase's public schema.
-- The web server uses the database owner role and continues to enforce validation;
-- authenticated browser roles receive read-only access to their own records.
CREATE TABLE IF NOT EXISTS "AnalysisRateLimit" (
  "userId" TEXT NOT NULL,
  "windowStart" TIMESTAMP(3) NOT NULL,
  "requestCount" INTEGER NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "AnalysisRateLimit_pkey" PRIMARY KEY ("userId")
);

ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Subscription" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "StyleProfile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "WeeklyEdit" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "WeeklyEditItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CatalogueAuditLog" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AnalysisRateLimit" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read their own account" ON "User";
DROP POLICY IF EXISTS "Users can read their own subscription" ON "Subscription";
DROP POLICY IF EXISTS "Users can read their own style profile" ON "StyleProfile";
DROP POLICY IF EXISTS "Users can read their own weekly edits" ON "WeeklyEdit";
DROP POLICY IF EXISTS "Users can read their own weekly edit items" ON "WeeklyEditItem";
DROP POLICY IF EXISTS "Anyone can read active products" ON "Product";

CREATE POLICY "Users can read their own account"
ON "User"
FOR SELECT
TO authenticated
USING ("id" = (SELECT auth.uid())::text);

CREATE POLICY "Users can read their own subscription"
ON "Subscription"
FOR SELECT
TO authenticated
USING ("userId" = (SELECT auth.uid())::text);

CREATE POLICY "Users can read their own style profile"
ON "StyleProfile"
FOR SELECT
TO authenticated
USING ("userId" = (SELECT auth.uid())::text);

CREATE POLICY "Users can read their own weekly edits"
ON "WeeklyEdit"
FOR SELECT
TO authenticated
USING ("userId" = (SELECT auth.uid())::text);

CREATE POLICY "Users can read their own weekly edit items"
ON "WeeklyEditItem"
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM "WeeklyEdit"
    WHERE "WeeklyEdit"."id" = "WeeklyEditItem"."weeklyEditId"
      AND "WeeklyEdit"."userId" = (SELECT auth.uid())::text
  )
);

CREATE POLICY "Anyone can read active products"
ON "Product"
FOR SELECT
TO anon, authenticated
USING ("status" = 'active');

-- CatalogueAuditLog and AnalysisRateLimit intentionally have no browser-role
-- policies. They are written and reviewed only through server-side paths.
