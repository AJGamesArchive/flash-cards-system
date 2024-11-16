-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CollectionAllocations" (
    "allocationUUID" TEXT NOT NULL PRIMARY KEY,
    "setUUID" TEXT NOT NULL,
    "collectionUUID" TEXT NOT NULL,
    CONSTRAINT "CollectionAllocations_setUUID_fkey" FOREIGN KEY ("setUUID") REFERENCES "Sets" ("setUUID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CollectionAllocations_collectionUUID_fkey" FOREIGN KEY ("collectionUUID") REFERENCES "Collections" ("collectionUUID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CollectionAllocations" ("allocationUUID", "collectionUUID", "setUUID") SELECT "allocationUUID", "collectionUUID", "setUUID" FROM "CollectionAllocations";
DROP TABLE "CollectionAllocations";
ALTER TABLE "new_CollectionAllocations" RENAME TO "CollectionAllocations";
CREATE UNIQUE INDEX "CollectionAllocations_allocationUUID_key" ON "CollectionAllocations"("allocationUUID");
CREATE TABLE "new_CollectionReviews" (
    "reviewUUID" TEXT NOT NULL PRIMARY KEY,
    "starRating" INTEGER NOT NULL,
    "collectionUUID" TEXT NOT NULL,
    "authorUUID" TEXT,
    "reviewDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CollectionReviews_collectionUUID_fkey" FOREIGN KEY ("collectionUUID") REFERENCES "Collections" ("collectionUUID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CollectionReviews_authorUUID_fkey" FOREIGN KEY ("authorUUID") REFERENCES "Users" ("userUUID") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_CollectionReviews" ("authorUUID", "collectionUUID", "reviewDate", "reviewUUID", "starRating") SELECT "authorUUID", "collectionUUID", "reviewDate", "reviewUUID", "starRating" FROM "CollectionReviews";
DROP TABLE "CollectionReviews";
ALTER TABLE "new_CollectionReviews" RENAME TO "CollectionReviews";
CREATE UNIQUE INDEX "CollectionReviews_reviewUUID_key" ON "CollectionReviews"("reviewUUID");
CREATE TABLE "new_Collections" (
    "collectionUUID" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdOn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorUUID" TEXT NOT NULL,
    CONSTRAINT "Collections_authorUUID_fkey" FOREIGN KEY ("authorUUID") REFERENCES "Users" ("userUUID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Collections" ("authorUUID", "collectionUUID", "createdOn", "description", "name") SELECT "authorUUID", "collectionUUID", "createdOn", "description", "name" FROM "Collections";
DROP TABLE "Collections";
ALTER TABLE "new_Collections" RENAME TO "Collections";
CREATE UNIQUE INDEX "Collections_collectionUUID_key" ON "Collections"("collectionUUID");
CREATE TABLE "new_FlashCardUsageLogs" (
    "logUUID" TEXT NOT NULL PRIMARY KEY,
    "faceDownTime" INTEGER NOT NULL,
    "revisionTime" INTEGER NOT NULL,
    "timesFlipped" INTEGER NOT NULL,
    "cardUUID" TEXT,
    CONSTRAINT "FlashCardUsageLogs_cardUUID_fkey" FOREIGN KEY ("cardUUID") REFERENCES "FlashCards" ("cardUUID") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_FlashCardUsageLogs" ("cardUUID", "faceDownTime", "logUUID", "revisionTime", "timesFlipped") SELECT "cardUUID", "faceDownTime", "logUUID", "revisionTime", "timesFlipped" FROM "FlashCardUsageLogs";
DROP TABLE "FlashCardUsageLogs";
ALTER TABLE "new_FlashCardUsageLogs" RENAME TO "FlashCardUsageLogs";
CREATE UNIQUE INDEX "FlashCardUsageLogs_logUUID_key" ON "FlashCardUsageLogs"("logUUID");
CREATE TABLE "new_FlashCards" (
    "cardUUID" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "setUUID" TEXT NOT NULL,
    "difficultyUUID" TEXT,
    CONSTRAINT "FlashCards_setUUID_fkey" FOREIGN KEY ("setUUID") REFERENCES "Sets" ("setUUID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FlashCards_difficultyUUID_fkey" FOREIGN KEY ("difficultyUUID") REFERENCES "Difficulties" ("difficultyUUID") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_FlashCards" ("answer", "cardUUID", "createdAt", "difficultyUUID", "question", "setUUID", "updatedAt") SELECT "answer", "cardUUID", "createdAt", "difficultyUUID", "question", "setUUID", "updatedAt" FROM "FlashCards";
DROP TABLE "FlashCards";
ALTER TABLE "new_FlashCards" RENAME TO "FlashCards";
CREATE UNIQUE INDEX "FlashCards_cardUUID_key" ON "FlashCards"("cardUUID");
CREATE TABLE "new_HiddenCardAllocation" (
    "allocationUUID" TEXT NOT NULL PRIMARY KEY,
    "userUUID" TEXT NOT NULL,
    "cardUUID" TEXT NOT NULL,
    CONSTRAINT "HiddenCardAllocation_userUUID_fkey" FOREIGN KEY ("userUUID") REFERENCES "Users" ("userUUID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "HiddenCardAllocation_cardUUID_fkey" FOREIGN KEY ("cardUUID") REFERENCES "FlashCards" ("cardUUID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_HiddenCardAllocation" ("allocationUUID", "cardUUID", "userUUID") SELECT "allocationUUID", "cardUUID", "userUUID" FROM "HiddenCardAllocation";
DROP TABLE "HiddenCardAllocation";
ALTER TABLE "new_HiddenCardAllocation" RENAME TO "HiddenCardAllocation";
CREATE UNIQUE INDEX "HiddenCardAllocation_allocationUUID_key" ON "HiddenCardAllocation"("allocationUUID");
CREATE TABLE "new_SetReview" (
    "reviewUUID" TEXT NOT NULL PRIMARY KEY,
    "review" TEXT NOT NULL,
    "starRating" INTEGER NOT NULL,
    "reviewDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorUUID" TEXT,
    "setUUID" TEXT NOT NULL,
    CONSTRAINT "SetReview_authorUUID_fkey" FOREIGN KEY ("authorUUID") REFERENCES "Users" ("userUUID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "SetReview_setUUID_fkey" FOREIGN KEY ("setUUID") REFERENCES "Sets" ("setUUID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SetReview" ("authorUUID", "review", "reviewDate", "reviewUUID", "setUUID", "starRating") SELECT "authorUUID", "review", "reviewDate", "reviewUUID", "setUUID", "starRating" FROM "SetReview";
DROP TABLE "SetReview";
ALTER TABLE "new_SetReview" RENAME TO "SetReview";
CREATE UNIQUE INDEX "SetReview_reviewUUID_key" ON "SetReview"("reviewUUID");
CREATE TABLE "new_Sets" (
    "setUUID" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authorUUID" TEXT NOT NULL,
    CONSTRAINT "Sets_authorUUID_fkey" FOREIGN KEY ("authorUUID") REFERENCES "Users" ("userUUID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Sets" ("authorUUID", "createdAt", "description", "name", "setUUID", "updatedAt") SELECT "authorUUID", "createdAt", "description", "name", "setUUID", "updatedAt" FROM "Sets";
DROP TABLE "Sets";
ALTER TABLE "new_Sets" RENAME TO "Sets";
CREATE UNIQUE INDEX "Sets_setUUID_key" ON "Sets"("setUUID");
CREATE TABLE "new_Users" (
    "userUUID" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "adminFlag" BOOLEAN NOT NULL DEFAULT false,
    "loginToken" TEXT,
    "userSince" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Users" ("adminFlag", "loginToken", "password", "userSince", "userUUID", "username") SELECT "adminFlag", "loginToken", "password", "userSince", "userUUID", "username" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_userUUID_key" ON "Users"("userUUID");
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
