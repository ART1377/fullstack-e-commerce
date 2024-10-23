/*
  Warnings:

  - A unique constraint covering the columns `[stockId,cartId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stockId` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CartItem_productId_cartId_key";

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "stockId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_stockId_cartId_key" ON "CartItem"("stockId", "cartId");

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE CASCADE ON UPDATE CASCADE;
