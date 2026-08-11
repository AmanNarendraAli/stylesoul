-- Durable, pseudonymous tombstones prevent authenticated in-flight requests from
-- recreating personal data after account deletion begins.
CREATE TABLE "AccountDeletionGuard" (
  "userIdHash" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AccountDeletionGuard_pkey" PRIMARY KEY ("userIdHash")
);

ALTER TABLE "AccountDeletionGuard" ENABLE ROW LEVEL SECURITY;

-- No browser-role policy: lifecycle guards are managed only by server services.
