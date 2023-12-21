/*
  Warnings:

  - You are about to drop the column `admin` on the `Clubs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClubMembers" DROP CONSTRAINT "ClubMembers_userId_fkey";

-- AlterTable
ALTER TABLE "Clubs" DROP COLUMN "admin";

-- AlterTable
ALTER TABLE "ClubsBooks" ADD COLUMN     "currentBook" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "ClubsAdmins" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,

    CONSTRAINT "ClubsAdmins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClubsAdmins_userId_clubId_key" ON "ClubsAdmins"("userId", "clubId");

-- AddForeignKey
ALTER TABLE "ClubsAdmins" ADD CONSTRAINT "ClubsAdmins_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Clubs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubsAdmins" ADD CONSTRAINT "ClubsAdmins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubMembers" ADD CONSTRAINT "ClubMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
