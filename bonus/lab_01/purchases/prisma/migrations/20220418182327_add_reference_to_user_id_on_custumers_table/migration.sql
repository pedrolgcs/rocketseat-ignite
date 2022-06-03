/*
  Warnings:

  - A unique constraint covering the columns `[authUserId]` on the table `custumers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "custumers" ADD COLUMN     "authUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "custumers_authUserId_key" ON "custumers"("authUserId");
