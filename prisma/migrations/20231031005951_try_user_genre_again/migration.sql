/*
  Warnings:

  - You are about to drop the column `UserId` on the `UserGenre` table. All the data in the column will be lost.
  - Added the required column `userId` to the `UserGenre` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserGenre" DROP CONSTRAINT "UserGenre_UserId_fkey";

-- AlterTable
ALTER TABLE "UserGenre" DROP COLUMN "UserId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserGenre" ADD CONSTRAINT "UserGenre_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
