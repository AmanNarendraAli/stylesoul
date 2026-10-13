-- Face proportions on the style profile; garment details and rupee pricing on products.
ALTER TABLE "StyleProfile" ADD COLUMN "faceLength" DOUBLE PRECISION,
ADD COLUMN "faceLines" DOUBLE PRECISION;

ALTER TABLE "Product" ADD COLUMN "neckline" TEXT,
ADD COLUMN "pattern" TEXT,
ADD COLUMN "drape" TEXT,
ADD COLUMN "metal" TEXT,
ALTER COLUMN "currency" SET DEFAULT 'INR';
