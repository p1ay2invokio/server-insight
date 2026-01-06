/*
  Warnings:

  - You are about to drop the column `classifyId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Classify` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `TrashCategoryId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_classifyId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "classifyId",
ADD COLUMN     "TrashCategoryId" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "Classify";

-- CreateTable
CREATE TABLE "TrashCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "TrashCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TrashCategory_id_key" ON "TrashCategory"("id");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_TrashCategoryId_fkey" FOREIGN KEY ("TrashCategoryId") REFERENCES "TrashCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
