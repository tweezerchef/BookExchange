/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "token" TEXT;

-- CreateTable
CREATE TABLE "UserGenre" (
    "id" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,

    CONSTRAINT "UserGenre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserHobbies" (
    "id" TEXT NOT NULL,
    "hobbies" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,

    CONSTRAINT "UserHobbies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPictures" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT,

    CONSTRAINT "UserPictures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBooks" (
    "id" TEXT NOT NULL,
    "wishlist" BOOLEAN NOT NULL DEFAULT false,
    "owned" BOOLEAN NOT NULL DEFAULT false,
    "booksId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" DOUBLE PRECISION,
    "review" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "reading" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserBooks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBookNotes" (
    "id" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "page" INTEGER,
    "mentionId" TEXT,
    "userBookId" TEXT NOT NULL,

    CONSTRAINT "UserBookNotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Places" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "placeId" TEXT NOT NULL,
    "Rating" DOUBLE PRECISION,
    "CheckIns" INTEGER,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "googlePlaceId" TEXT NOT NULL,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "text" TEXT,

    CONSTRAINT "User_Places_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlacesToRead" (
    "id" TEXT NOT NULL,
    "nickName" TEXT,
    "Private" BOOLEAN NOT NULL DEFAULT false,
    "Lat" DOUBLE PRECISION,
    "Long" DOUBLE PRECISION,
    "googlePlaceId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "name" TEXT,
    "placeEditorial" TEXT,
    "rating" DOUBLE PRECISION,
    "types" TEXT[],
    "website" TEXT,
    "phone" TEXT,

    CONSTRAINT "PlacesToRead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Places_Pictures" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "googlePic" BOOLEAN,
    "description" TEXT,
    "placeId" TEXT NOT NULL,

    CONSTRAINT "Places_Pictures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" TEXT NOT NULL,
    "socketIOid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "recipient" TEXT,
    "type" TEXT,
    "offline" BOOLEAN,
    "read" BOOLEAN,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversations" (
    "id" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DirectMessages" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DirectMessages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Books" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "description" TEXT,
    "paperback" BOOLEAN,
    "content" TEXT,
    "image" TEXT,
    "ISBN10" TEXT NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "booksId" TEXT NOT NULL,
    "genre" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clubs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "admin" TEXT,

    CONSTRAINT "Clubs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clubs_Books" (
    "id" TEXT NOT NULL,
    "booksId" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TEXT,
    "endDate" TEXT,

    CONSTRAINT "Clubs_Books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClubMembers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,

    CONSTRAINT "ClubMembers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discussions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "clubsId" TEXT NOT NULL,
    "bookId" TEXT,
    "thumbsDown" INTEGER NOT NULL DEFAULT 0,
    "thumbsUp" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT,
    "bookTitle" TEXT,
    "timeline" TEXT,

    CONSTRAINT "Discussions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscussionsUsers" (
    "id" TEXT NOT NULL,
    "discussionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "thumbsUp" BOOLEAN NOT NULL DEFAULT false,
    "thumbsDown" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DiscussionsUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "discussionsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "thumbsDown" INTEGER NOT NULL DEFAULT 0,
    "thumbsUp" INTEGER NOT NULL DEFAULT 0,
    "BookId" TEXT,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostsUsers" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "thumbsUp" BOOLEAN NOT NULL DEFAULT false,
    "thumbsDown" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PostsUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "bookId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "placeId" TEXT,
    "description" TEXT,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friendship" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Friendship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LendingTable" (
    "id" TEXT NOT NULL,
    "lenderId" TEXT NOT NULL,
    "borrowerId" TEXT NOT NULL,
    "LenderReview" TEXT,
    "LenderRating" INTEGER,
    "BorrowRating" INTEGER,
    "BorrowReview" TEXT,
    "DateInPlanned" TEXT,
    "DateIn" TEXT,
    "Borrowed" BOOLEAN NOT NULL DEFAULT false,
    "Returned" BOOLEAN NOT NULL DEFAULT false,
    "Datebackplanned" TEXT,
    "DateBack" TEXT,
    "inPlaceId" TEXT,
    "outPlaceId" TEXT,
    "InTime" TEXT,
    "InDate" TEXT,
    "OutTime" TEXT,
    "OutDate" TEXT,

    CONSTRAINT "LendingTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "us_gaz" (
    "id" SERIAL NOT NULL,
    "seq" INTEGER,
    "word" TEXT,
    "stdword" TEXT,
    "token" INTEGER,
    "is_custom" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "pk_us_gaz" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "us_lex" (
    "id" SERIAL NOT NULL,
    "seq" INTEGER,
    "word" TEXT,
    "stdword" TEXT,
    "token" INTEGER,
    "is_custom" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "pk_us_lex" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "us_rules" (
    "id" SERIAL NOT NULL,
    "rule" TEXT,
    "is_custom" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "pk_us_rules" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_conversationMembers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserBooks_userId_booksId_key" ON "UserBooks"("userId", "booksId");

-- CreateIndex
CREATE UNIQUE INDEX "User_Places_userId_placeId_key" ON "User_Places"("userId", "placeId");

-- CreateIndex
CREATE UNIQUE INDEX "PlacesToRead_googlePlaceId_key" ON "PlacesToRead"("googlePlaceId");

-- CreateIndex
CREATE UNIQUE INDEX "Books_title_key" ON "Books"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Books_ISBN10_key" ON "Books"("ISBN10");

-- CreateIndex
CREATE UNIQUE INDEX "Clubs_name_key" ON "Clubs"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ClubMembers_userId_clubId_key" ON "ClubMembers"("userId", "clubId");

-- CreateIndex
CREATE UNIQUE INDEX "Friendship_userId_friendId_key" ON "Friendship"("userId", "friendId");

-- CreateIndex
CREATE UNIQUE INDEX "_conversationMembers_AB_unique" ON "_conversationMembers"("A", "B");

-- CreateIndex
CREATE INDEX "_conversationMembers_B_index" ON "_conversationMembers"("B");

-- AddForeignKey
ALTER TABLE "UserGenre" ADD CONSTRAINT "UserGenre_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHobbies" ADD CONSTRAINT "UserHobbies_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPictures" ADD CONSTRAINT "UserPictures_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBooks" ADD CONSTRAINT "UserBooks_booksId_fkey" FOREIGN KEY ("booksId") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBooks" ADD CONSTRAINT "UserBooks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBookNotes" ADD CONSTRAINT "UserBookNotes_userBookId_fkey" FOREIGN KEY ("userBookId") REFERENCES "UserBooks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Places" ADD CONSTRAINT "User_Places_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "PlacesToRead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Places" ADD CONSTRAINT "User_Places_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Places_Pictures" ADD CONSTRAINT "Places_Pictures_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "PlacesToRead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectMessages" ADD CONSTRAINT "DirectMessages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectMessages" ADD CONSTRAINT "DirectMessages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_booksId_fkey" FOREIGN KEY ("booksId") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clubs_Books" ADD CONSTRAINT "Clubs_Books_booksId_fkey" FOREIGN KEY ("booksId") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clubs_Books" ADD CONSTRAINT "Clubs_Books_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Clubs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubMembers" ADD CONSTRAINT "ClubMembers_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Clubs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubMembers" ADD CONSTRAINT "ClubMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussions" ADD CONSTRAINT "Discussions_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussions" ADD CONSTRAINT "Discussions_clubsId_fkey" FOREIGN KEY ("clubsId") REFERENCES "Clubs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussions" ADD CONSTRAINT "Discussions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscussionsUsers" ADD CONSTRAINT "DiscussionsUsers_discussionId_fkey" FOREIGN KEY ("discussionId") REFERENCES "Discussions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscussionsUsers" ADD CONSTRAINT "DiscussionsUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_BookId_fkey" FOREIGN KEY ("BookId") REFERENCES "Books"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_discussionsId_fkey" FOREIGN KEY ("discussionsId") REFERENCES "Discussions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostsUsers" ADD CONSTRAINT "PostsUsers_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostsUsers" ADD CONSTRAINT "PostsUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "PlacesToRead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LendingTable" ADD CONSTRAINT "LendingTable_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LendingTable" ADD CONSTRAINT "LendingTable_inPlaceId_fkey" FOREIGN KEY ("inPlaceId") REFERENCES "PlacesToRead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LendingTable" ADD CONSTRAINT "LendingTable_lenderId_fkey" FOREIGN KEY ("lenderId") REFERENCES "UserBooks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LendingTable" ADD CONSTRAINT "LendingTable_outPlaceId_fkey" FOREIGN KEY ("outPlaceId") REFERENCES "PlacesToRead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_conversationMembers" ADD CONSTRAINT "_conversationMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "Conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_conversationMembers" ADD CONSTRAINT "_conversationMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
