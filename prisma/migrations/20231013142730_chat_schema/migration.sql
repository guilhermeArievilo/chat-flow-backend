/*
  Warnings:

  - A unique constraint covering the columns `[externalChatId]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "externalChatId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Chat_externalChatId_key" ON "Chat"("externalChatId");
