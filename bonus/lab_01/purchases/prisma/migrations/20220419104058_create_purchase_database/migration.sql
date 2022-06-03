/*
  Warnings:

  - You are about to drop the column `custumerId` on the `purchases` table. All the data in the column will be lost.
  - You are about to drop the `custumers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customerId` to the `purchases` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_custumerId_fkey";

-- AlterTable
ALTER TABLE "purchases" DROP COLUMN "custumerId",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- DropTable
DROP TABLE "custumers";

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "authUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_authUserId_key" ON "customers"("authUserId");

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
