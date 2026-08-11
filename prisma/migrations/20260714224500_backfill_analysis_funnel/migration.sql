-- Preserve the original first-analysis time for profiles created before funnel instrumentation.
INSERT INTO "FunnelEvent" ("id", "userId", "name", "createdAt")
SELECT
  gen_random_uuid()::text,
  "StyleProfile"."userId",
  'analysis_complete',
  "StyleProfile"."createdAt"
FROM "StyleProfile"
ON CONFLICT ("userId", "name") DO NOTHING;
