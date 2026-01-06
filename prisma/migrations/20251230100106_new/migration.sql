/*
  Warnings:

  - You are about to drop the column `TrashCategoryId` on the `Product` table. All the data in the column will be lost.
  - Added the required column `trashCategoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_TrashCategoryId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "TrashCategoryId",
ADD COLUMN     "trashCategoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_trashCategoryId_fkey" FOREIGN KEY ("trashCategoryId") REFERENCES "TrashCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
