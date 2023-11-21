/*
  Warnings:

  - You are about to drop the column `text` on the `DirectMessages` table. All the data in the column will be lost.
  - Added the required column `message` to the `DirectMessages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DirectMessages" DROP COLUMN "text",
ADD COLUMN     "message" TEXT NOT NULL;
