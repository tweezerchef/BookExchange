/*
  Warnings:

  - You are about to drop the column `owned` on the `UserBooks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserBooks" DROP COLUMN "owned",
ADD COLUMN     "lendingLibrary" BOOLEAN NOT NULL DEFAULT false;
