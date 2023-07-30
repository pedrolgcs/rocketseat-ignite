/*
  Warnings:

  - You are about to drop the column `image` on the `pets_image` table. All the data in the column will be lost.
  - Added the required column `name` to the `pets_image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets_image" DROP COLUMN "image",
ADD COLUMN     "name" TEXT NOT NULL;
