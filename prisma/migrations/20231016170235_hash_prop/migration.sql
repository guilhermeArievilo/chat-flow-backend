/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Attendant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hash]` on the table `Attendant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hash` to the `Attendant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attendant" ADD COLUMN     "hash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Attendant_email_key" ON "Attendant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Attendant_hash_key" ON "Attendant"("hash");
