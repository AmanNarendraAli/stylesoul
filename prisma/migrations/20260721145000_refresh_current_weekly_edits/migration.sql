-- Current-week edits were selected against the previous broad family tags.
-- Preserve history, but regenerate current and future edits from curated subtypes.
DELETE FROM "WeeklyEdit"
WHERE "weekStart" >= date_trunc('week', timezone('UTC', now()));
