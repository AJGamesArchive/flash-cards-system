-- CreateTable
CREATE TABLE "Sets" (
    "setUUID" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authorUUID" TEXT NOT NULL,
    CONSTRAINT "Sets_authorUUID_fkey" FOREIGN KEY ("authorUUID") REFERENCES "Users" ("userUUID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SetReivews" (
    "reviewUUID" TEXT NOT NULL PRIMARY KEY,
    "review" TEXT NOT NULL,
    "starRating" INTEGER NOT NULL,
    "reviewDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorUUID" TEXT NOT NULL,
    "setUUID" TEXT NOT NULL,
    CONSTRAINT "SetReivews_authorUUID_fkey" FOREIGN KEY ("authorUUID") REFERENCES "Users" ("userUUID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SetReivews_setUUID_fkey" FOREIGN KEY ("setUUID") REFERENCES "Sets" ("setUUID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Collections" (
    "collectionUUID" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdOn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorUUID" TEXT NOT NULL,
    CONSTRAINT "Collections_authorUUID_fkey" FOREIGN KEY ("authorUUID") REFERENCES "Users" ("userUUID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CollectionReviews" (
    "reviewUUID" TEXT NOT NULL PRIMARY KEY,
    "starRating" INTEGER NOT NULL,
    "collectionUUID" TEXT NOT NULL,
    "authorUUID" TEXT NOT NULL,
    "reviewDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CollectionReviews_collectionUUID_fkey" FOREIGN KEY ("collectionUUID") REFERENCES "Collections" ("collectionUUID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CollectionReviews_authorUUID_fkey" FOREIGN KEY ("authorUUID") REFERENCES "Users" ("userUUID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CollectionAllocations" (
    "allocationUUID" TEXT NOT NULL PRIMARY KEY,
    "setUUID" TEXT NOT NULL,
    "collectionUUID" TEXT NOT NULL,
    CONSTRAINT "CollectionAllocations_setUUID_fkey" FOREIGN KEY ("setUUID") REFERENCES "Sets" ("setUUID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CollectionAllocations_collectionUUID_fkey" FOREIGN KEY ("collectionUUID") REFERENCES "Collections" ("collectionUUID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Difficulties" (
    "difficultyUUID" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FlashCards" (
    "cardUUID" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "setUUID" TEXT NOT NULL,
    "difficultyUUID" TEXT NOT NULL,
    CONSTRAINT "FlashCards_setUUID_fkey" FOREIGN KEY ("setUUID") REFERENCES "Sets" ("setUUID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FlashCards_difficultyUUID_fkey" FOREIGN KEY ("difficultyUUID") REFERENCES "Difficulties" ("difficultyUUID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HiddenCardAllocation" (
    "allocationUUID" TEXT NOT NULL PRIMARY KEY,
    "userUUID" TEXT NOT NULL,
    "cardUUID" TEXT NOT NULL,
    CONSTRAINT "HiddenCardAllocation_userUUID_fkey" FOREIGN KEY ("userUUID") REFERENCES "Users" ("userUUID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "HiddenCardAllocation_cardUUID_fkey" FOREIGN KEY ("cardUUID") REFERENCES "FlashCards" ("cardUUID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FlashCardUsageLogs" (
    "logUUID" TEXT NOT NULL PRIMARY KEY,
    "faceDownTime" INTEGER NOT NULL,
    "revisionTime" INTEGER NOT NULL,
    "timesFlipped" INTEGER NOT NULL,
    "cardUUID" TEXT NOT NULL,
    CONSTRAINT "FlashCardUsageLogs_cardUUID_fkey" FOREIGN KEY ("cardUUID") REFERENCES "FlashCards" ("cardUUID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SystemConfig" (
    "configUUID" TEXT NOT NULL PRIMARY KEY,
    "setCreationLimit" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "userUUID" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "adminFlag" BOOLEAN NOT NULL DEFAULT false,
    "loginToken" TEXT,
    "userSince" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Users" ("adminFlag", "loginToken", "password", "userSince", "userUUID", "username") SELECT "adminFlag", "loginToken", "password", "userSince", "userUUID", "username" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_userUUID_key" ON "Users"("userUUID");
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Sets_setUUID_key" ON "Sets"("setUUID");

-- CreateIndex
CREATE UNIQUE INDEX "SetReivews_reviewUUID_key" ON "SetReivews"("reviewUUID");

-- CreateIndex
CREATE UNIQUE INDEX "Collections_collectionUUID_key" ON "Collections"("collectionUUID");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionReviews_reviewUUID_key" ON "CollectionReviews"("reviewUUID");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionAllocations_allocationUUID_key" ON "CollectionAllocations"("allocationUUID");

-- CreateIndex
CREATE UNIQUE INDEX "Difficulties_difficultyUUID_key" ON "Difficulties"("difficultyUUID");

-- CreateIndex
CREATE UNIQUE INDEX "FlashCards_cardUUID_key" ON "FlashCards"("cardUUID");

-- CreateIndex
CREATE UNIQUE INDEX "HiddenCardAllocation_allocationUUID_key" ON "HiddenCardAllocation"("allocationUUID");

-- CreateIndex
CREATE UNIQUE INDEX "FlashCardUsageLogs_logUUID_key" ON "FlashCardUsageLogs"("logUUID");

-- CreateIndex
CREATE UNIQUE INDEX "SystemConfig_configUUID_key" ON "SystemConfig"("configUUID");
