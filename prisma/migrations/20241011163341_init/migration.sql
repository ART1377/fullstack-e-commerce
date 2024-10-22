/*
  Warnings:

  - You are about to drop the column `isDiscounted` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isHeroProduct` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isInDiscountSection` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isInHeroSection` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "rating" REAL,
    "discount" INTEGER,
    "isInDiscountSection" BOOLEAN NOT NULL DEFAULT false,
    "isInHeroSection" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Product" ("category", "description", "discount", "id", "price", "rating", "title") SELECT "category", "description", "discount", "id", "price", "rating", "title" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "emailVerified", "firstName", "id", "image", "lastName", "password", "updatedAt") SELECT "createdAt", "email", "emailVerified", "firstName", "id", "image", "lastName", "password", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
