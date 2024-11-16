/*
  Warnings:

  - You are about to drop the column `donationId` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "donationId",
ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '15 minutes';
