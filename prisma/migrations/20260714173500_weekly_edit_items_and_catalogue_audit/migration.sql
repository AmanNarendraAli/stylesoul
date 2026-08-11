-- Replace the legacy product ID array with ordered relational items. The
-- development database is expected to be empty, but valid legacy references
-- are copied forward so applying this migration is non-destructive.
CREATE TABLE "WeeklyEditItem" (
    "id" TEXT NOT NULL,
    "weeklyEditId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "WeeklyEditItem_pkey" PRIMARY KEY ("id")
);

WITH valid_legacy AS (
    SELECT DISTINCT ON (weekly_edit."id", legacy_item."productId")
        weekly_edit."id" AS weekly_edit_id,
        legacy_item."productId" AS product_id,
        legacy_item."position"::INTEGER AS original_position
    FROM "WeeklyEdit" AS weekly_edit
    CROSS JOIN LATERAL unnest(weekly_edit."productIds") WITH ORDINALITY
        AS legacy_item("productId", "position")
    INNER JOIN "Product" AS product ON product."id" = legacy_item."productId"
    ORDER BY weekly_edit."id", legacy_item."productId", legacy_item."position"
), ranked_legacy AS (
    SELECT
        weekly_edit_id,
        product_id,
        original_position,
        ROW_NUMBER() OVER (
            PARTITION BY weekly_edit_id ORDER BY original_position
        ) - 1 AS normalized_position
    FROM valid_legacy
)
INSERT INTO "WeeklyEditItem" ("id", "weeklyEditId", "productId", "position")
SELECT
    weekly_edit_id || '-item-' || original_position::TEXT,
    weekly_edit_id,
    product_id,
    normalized_position
FROM ranked_legacy;

ALTER TABLE "WeeklyEdit" DROP COLUMN "productIds";

CREATE UNIQUE INDEX "WeeklyEditItem_weeklyEditId_productId_key"
    ON "WeeklyEditItem"("weeklyEditId", "productId");
CREATE UNIQUE INDEX "WeeklyEditItem_weeklyEditId_position_key"
    ON "WeeklyEditItem"("weeklyEditId", "position");
CREATE INDEX "WeeklyEditItem_productId_idx" ON "WeeklyEditItem"("productId");

ALTER TABLE "WeeklyEditItem"
    ADD CONSTRAINT "WeeklyEditItem_weeklyEditId_fkey"
    FOREIGN KEY ("weeklyEditId") REFERENCES "WeeklyEdit"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "WeeklyEditItem"
    ADD CONSTRAINT "WeeklyEditItem_productId_fkey"
    FOREIGN KEY ("productId") REFERENCES "Product"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

-- Catalogue mutations are append-only audited with their acting admin.
CREATE TABLE "CatalogueAuditLog" (
    "id" TEXT NOT NULL,
    "actorUserId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "changes" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CatalogueAuditLog_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "CatalogueAuditLog_actorUserId_createdAt_idx"
    ON "CatalogueAuditLog"("actorUserId", "createdAt");
CREATE INDEX "CatalogueAuditLog_productId_createdAt_idx"
    ON "CatalogueAuditLog"("productId", "createdAt");

ALTER TABLE "CatalogueAuditLog"
    ADD CONSTRAINT "CatalogueAuditLog_actorUserId_fkey"
    FOREIGN KEY ("actorUserId") REFERENCES "User"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "CatalogueAuditLog"
    ADD CONSTRAINT "CatalogueAuditLog_productId_fkey"
    FOREIGN KEY ("productId") REFERENCES "Product"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;
