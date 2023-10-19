/*
  Warnings:

  - You are about to drop the column `rating` on the `UserBooks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserBooks" DROP COLUMN "rating",
ADD COLUMN     "starRating" DOUBLE PRECISION;
