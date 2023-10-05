/*
  Warnings:

  - You are about to drop the column `paperback` on the `Books` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Books" DROP COLUMN "paperback",
ADD COLUMN     "buyLink" TEXT,
ADD COLUMN     "mainGenre" TEXT,
ADD COLUMN     "pageCount" INTEGER,
ADD COLUMN     "pubDate" TEXT,
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "selfLink" TEXT,
ADD COLUMN     "subTitle" TEXT,
ADD COLUMN     "viewAbility" TEXT;

-- CreateTable
CREATE TABLE "BookAccess" (
    "id" TEXT NOT NULL,
    "downloadLink" TEXT,
    "acsToken" TEXT,
    "pdfLink" TEXT,
    "pdfAcsToken" TEXT,
    "infoLink" TEXT,
    "canVolLink" TEXT,
    "bookId" TEXT NOT NULL,

    CONSTRAINT "BookAccess_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookAccess" ADD CONSTRAINT "BookAccess_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
