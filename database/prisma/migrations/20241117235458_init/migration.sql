/*
  Warnings:

  - You are about to drop the `CollectionReviews` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `CollectionAllocations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `allocationUUID` on the `CollectionAllocations` table. All the data in the column will be lost.
  - The primary key for the `HiddenCardAllocation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `allocationUUID` on the `HiddenCardAllocation` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "CollectionReviews_reviewUUID_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CollectionReviews";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CollectionAllocations" (
    "setUUID" TEXT NOT NULL,
    "collectionUUID" TEXT NOT NULL,

    PRIMARY KEY ("setUUID", "collectionUUID"),
    CONSTRAINT "CollectionAllocations_setUUID_fkey" FOREIGN KEY ("setUUID") REFERENCES "Sets" ("setUUID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CollectionAllocations_collectionUUID_fkey" FOREIGN KEY ("collectionUUID") REFERENCES "Collections" ("collectionUUID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CollectionAllocations" ("collectionUUID", "setUUID") SELECT "collectionUUID", "setUUID" FROM "CollectionAllocations";
DROP TABLE "CollectionAllocations";
ALTER TABLE "new_CollectionAllocations" RENAME TO "CollectionAllocations";
CREATE TABLE "new_HiddenCardAllocation" (
    "userUUID" TEXT NOT NULL,
    "cardUUID" TEXT NOT NULL,

    PRIMARY KEY ("userUUID", "cardUUID"),
    CONSTRAINT "HiddenCardAllocation_userUUID_fkey" FOREIGN KEY ("userUUID") REFERENCES "Users" ("userUUID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "HiddenCardAllocation_cardUUID_fkey" FOREIGN KEY ("cardUUID") REFERENCES "FlashCards" ("cardUUID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_HiddenCardAllocation" ("cardUUID", "userUUID") SELECT "cardUUID", "userUUID" FROM "HiddenCardAllocation";
DROP TABLE "HiddenCardAllocation";
ALTER TABLE "new_HiddenCardAllocation" RENAME TO "HiddenCardAllocation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
