-- Retain catalogue audit history while removing the deleted account's identity.
ALTER TABLE "CatalogueAuditLog"
  DROP CONSTRAINT "CatalogueAuditLog_actorUserId_fkey";

ALTER TABLE "CatalogueAuditLog"
  ALTER COLUMN "actorUserId" DROP NOT NULL;

ALTER TABLE "CatalogueAuditLog"
  ADD CONSTRAINT "CatalogueAuditLog_actorUserId_fkey"
  FOREIGN KEY ("actorUserId") REFERENCES "User"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;
