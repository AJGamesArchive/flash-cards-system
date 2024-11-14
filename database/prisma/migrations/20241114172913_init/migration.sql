-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SystemConfig" (
    "configUUID" TEXT NOT NULL PRIMARY KEY,
    "setCreationLimit" INTEGER NOT NULL,
    "creationCounter" INTEGER NOT NULL DEFAULT 0,
    "currentDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_SystemConfig" ("configUUID", "setCreationLimit") SELECT "configUUID", "setCreationLimit" FROM "SystemConfig";
DROP TABLE "SystemConfig";
ALTER TABLE "new_SystemConfig" RENAME TO "SystemConfig";
CREATE UNIQUE INDEX "SystemConfig_configUUID_key" ON "SystemConfig"("configUUID");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
