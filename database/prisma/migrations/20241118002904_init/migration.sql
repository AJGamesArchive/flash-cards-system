/*
  Warnings:

  - Added the required column `updatedOn` to the `Collections` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Collections" (
    "collectionUUID" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdOn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedOn" DATETIME NOT NULL,
    "authorUUID" TEXT NOT NULL,
    CONSTRAINT "Collections_authorUUID_fkey" FOREIGN KEY ("authorUUID") REFERENCES "Users" ("userUUID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Collections" ("authorUUID", "collectionUUID", "createdOn", "description", "name") SELECT "authorUUID", "collectionUUID", "createdOn", "description", "name" FROM "Collections";
DROP TABLE "Collections";
ALTER TABLE "new_Collections" RENAME TO "Collections";
CREATE UNIQUE INDEX "Collections_collectionUUID_key" ON "Collections"("collectionUUID");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
