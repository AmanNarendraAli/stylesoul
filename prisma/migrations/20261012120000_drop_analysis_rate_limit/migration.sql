-- The server photo fallback is removed, so its per-user rate limit is no longer
-- needed. Dropping the table also removes its row-level security setting.
DROP TABLE IF EXISTS "AnalysisRateLimit";
