-- CreateTable
CREATE TABLE "Users" (
    "userUUID" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "adminFlag" BOOLEAN NOT NULL DEFAULT false,
    "loginToken" TEXT NOT NULL,
    "userSince" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");
