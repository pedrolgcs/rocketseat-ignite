/*
  Warnings:

  - You are about to drop the column `image_url` on the `pets_image` table. All the data in the column will be lost.
  - Added the required column `image` to the `pets_image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets_image" DROP COLUMN "image_url",
ADD COLUMN     "image" TEXT NOT NULL;
