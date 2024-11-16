/*
  Warnings:

  - You are about to drop the column `expireAt` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `donationId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "expireAt",
ADD COLUMN     "donationId" TEXT NOT NULL,
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL DEFAULT NOW() + INTERVAL '15 minutes';
