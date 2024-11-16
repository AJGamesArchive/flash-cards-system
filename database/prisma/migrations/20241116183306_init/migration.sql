/*
  Warnings:

  - Added the required column `updatedAt` to the `CollectionReviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SetReview` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CollectionReviews" (
    "reviewUUID" TEXT NOT NULL PRIMARY KEY,
    "starRating" INTEGER NOT NULL,
    "collectionUUID" TEXT NOT NULL,
    "authorUUID" TEXT,
    "reviewDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CollectionReviews_collectionUUID_fkey" FOREIGN KEY ("collectionUUID") REFERENCES "Collections" ("collectionUUID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CollectionReviews_authorUUID_fkey" FOREIGN KEY ("authorUUID") REFERENCES "Users" ("userUUID") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_CollectionReviews" ("authorUUID", "collectionUUID", "reviewDate", "reviewUUID", "starRating") SELECT "authorUUID", "collectionUUID", "reviewDate", "reviewUUID", "starRating" FROM "CollectionReviews";
DROP TABLE "CollectionReviews";
ALTER TABLE "new_CollectionReviews" RENAME TO "CollectionReviews";
CREATE UNIQUE INDEX "CollectionReviews_reviewUUID_key" ON "CollectionReviews"("reviewUUID");
CREATE TABLE "new_SetReview" (
    "reviewUUID" TEXT NOT NULL PRIMARY KEY,
    "review" TEXT NOT NULL,
    "starRating" INTEGER NOT NULL,
    "reviewDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authorUUID" TEXT,
    "setUUID" TEXT NOT NULL,
    CONSTRAINT "SetReview_authorUUID_fkey" FOREIGN KEY ("authorUUID") REFERENCES "Users" ("userUUID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "SetReview_setUUID_fkey" FOREIGN KEY ("setUUID") REFERENCES "Sets" ("setUUID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SetReview" ("authorUUID", "review", "reviewDate", "reviewUUID", "setUUID", "starRating") SELECT "authorUUID", "review", "reviewDate", "reviewUUID", "setUUID", "starRating" FROM "SetReview";
DROP TABLE "SetReview";
ALTER TABLE "new_SetReview" RENAME TO "SetReview";
CREATE UNIQUE INDEX "SetReview_reviewUUID_key" ON "SetReview"("reviewUUID");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
