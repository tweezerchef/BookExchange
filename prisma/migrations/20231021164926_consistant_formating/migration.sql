/*
  Warnings:

  - You are about to drop the `Clubs_Books` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Places_Pictures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_Places` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Clubs_Books" DROP CONSTRAINT "Clubs_Books_booksId_fkey";

-- DropForeignKey
ALTER TABLE "Clubs_Books" DROP CONSTRAINT "Clubs_Books_clubId_fkey";

-- DropForeignKey
ALTER TABLE "Places_Pictures" DROP CONSTRAINT "Places_Pictures_placeId_fkey";

-- DropForeignKey
ALTER TABLE "User_Places" DROP CONSTRAINT "User_Places_placeId_fkey";

-- DropForeignKey
ALTER TABLE "User_Places" DROP CONSTRAINT "User_Places_userId_fkey";

-- DropTable
DROP TABLE "Clubs_Books";

-- DropTable
DROP TABLE "Places_Pictures";

-- DropTable
DROP TABLE "User_Places";

-- CreateTable
CREATE TABLE "UserPlaces" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "placeId" TEXT NOT NULL,
    "Rating" DOUBLE PRECISION,
    "CheckIns" INTEGER,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "googlePlaceId" TEXT NOT NULL,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "text" TEXT,

    CONSTRAINT "UserPlaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlacesPictures" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "googlePic" BOOLEAN,
    "description" TEXT,
    "placeId" TEXT NOT NULL,

    CONSTRAINT "PlacesPictures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClubsBooks" (
    "id" TEXT NOT NULL,
    "booksId" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TEXT,
    "endDate" TEXT,

    CONSTRAINT "ClubsBooks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPlaces_userId_placeId_key" ON "UserPlaces"("userId", "placeId");

-- AddForeignKey
ALTER TABLE "UserPlaces" ADD CONSTRAINT "UserPlaces_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "PlacesToRead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlaces" ADD CONSTRAINT "UserPlaces_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlacesPictures" ADD CONSTRAINT "PlacesPictures_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "PlacesToRead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubsBooks" ADD CONSTRAINT "ClubsBooks_booksId_fkey" FOREIGN KEY ("booksId") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubsBooks" ADD CONSTRAINT "ClubsBooks_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Clubs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
