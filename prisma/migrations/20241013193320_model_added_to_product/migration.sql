/*
  Warnings:

  - Added the required column `model` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "rating" REAL,
    "discount" INTEGER,
    "isInDiscountSection" BOOLEAN NOT NULL DEFAULT false,
    "isInHeroSection" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Product" ("brand", "category", "description", "discount", "id", "isInDiscountSection", "isInHeroSection", "price", "rating", "title") SELECT "brand", "category", "description", "discount", "id", "isInDiscountSection", "isInHeroSection", "price", "rating", "title" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
