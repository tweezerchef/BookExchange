/*
  Warnings:

  - Added the required column `startDate` to the `ClubsBooks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `ClubsBooks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClubsBooks" DROP COLUMN "startDate",
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
DROP COLUMN "endDate",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL;
