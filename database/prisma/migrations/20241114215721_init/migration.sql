/*
  Warnings:

  - You are about to drop the `SetReivews` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SetReivews";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "SetReview" (
    "reviewUUID" TEXT NOT NULL PRIMARY KEY,
    "review" TEXT NOT NULL,
    "starRating" INTEGER NOT NULL,
    "reviewDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorUUID" TEXT NOT NULL,
    "setUUID" TEXT NOT NULL,
    CONSTRAINT "SetReview_authorUUID_fkey" FOREIGN KEY ("authorUUID") REFERENCES "Users" ("userUUID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SetReview_setUUID_fkey" FOREIGN KEY ("setUUID") REFERENCES "Sets" ("setUUID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "SetReview_reviewUUID_key" ON "SetReview"("reviewUUID");
