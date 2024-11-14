/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `Difficulties` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Difficulties_value_key" ON "Difficulties"("value");
