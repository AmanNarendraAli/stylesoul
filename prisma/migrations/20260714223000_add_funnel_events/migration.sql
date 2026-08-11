-- Record one coarse first-party milestone per user without page-view or profile payloads.
CREATE TABLE "FunnelEvent" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "FunnelEvent_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "FunnelEvent_userId_name_key"
ON "FunnelEvent"("userId", "name");

CREATE INDEX "FunnelEvent_name_createdAt_idx"
ON "FunnelEvent"("name", "createdAt");

ALTER TABLE "FunnelEvent"
ADD CONSTRAINT "FunnelEvent_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "FunnelEvent" ENABLE ROW LEVEL SECURITY;

-- No browser-role policy: events are written by server services and returned to
-- their owner only through the authenticated account export.
