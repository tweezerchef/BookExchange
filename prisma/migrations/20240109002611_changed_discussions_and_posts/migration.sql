/*
  Warnings:

  - You are about to drop the column `timeline` on the `Discussions` table. All the data in the column will be lost.
  - You are about to drop the column `body` on the `Posts` table. All the data in the column will be lost.
  - Added the required column `body` to the `Discussions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Discussions" DROP COLUMN "timeline",
ADD COLUMN     "body" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "body",
ADD COLUMN     "parentId" TEXT,
ADD COLUMN     "post" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
