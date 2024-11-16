-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "pix_key" DROP NOT NULL,
ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '15 minutes';
