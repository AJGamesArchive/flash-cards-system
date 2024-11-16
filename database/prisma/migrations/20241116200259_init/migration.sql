-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "userUUID" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "adminFlag" BOOLEAN NOT NULL DEFAULT false,
    "loginToken" TEXT,
    "userSince" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "apiAccount" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Users" ("adminFlag", "deleted", "loginToken", "password", "userSince", "userUUID", "username") SELECT "adminFlag", "deleted", "loginToken", "password", "userSince", "userUUID", "username" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_userUUID_key" ON "Users"("userUUID");
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
