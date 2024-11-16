-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_paymentId_fkey";

-- AlterTable
ALTER TABLE "Donation" ALTER COLUMN "paymentId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '15 minutes';

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
