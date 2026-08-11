-- Preserve the distinction between legacy profiles and profiles with derived seasonal evidence.
ALTER TABLE "StyleProfile"
  ADD COLUMN IF NOT EXISTS "temperature" TEXT,
  ADD COLUMN IF NOT EXISTS "value" TEXT,
  ADD COLUMN IF NOT EXISTS "chroma" TEXT,
  ADD COLUMN IF NOT EXISTS "contrast" TEXT;
