-- Body measurements are optional: a profile can carry a colour season without a silhouette.
ALTER TABLE "StyleProfile"
  ALTER COLUMN "heightCm" DROP NOT NULL,
  ALTER COLUMN "bustCm" DROP NOT NULL,
  ALTER COLUMN "waistCm" DROP NOT NULL,
  ALTER COLUMN "hipsCm" DROP NOT NULL,
  ALTER COLUMN "shouldersCm" DROP NOT NULL,
  ALTER COLUMN "bodyShape" DROP NOT NULL;
