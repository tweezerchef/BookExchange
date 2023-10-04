-- CreateTable
CREATE TABLE "bookdata" (
    "asin" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "categories" TEXT NOT NULL,
    "ISBN10" TEXT NOT NULL,

    CONSTRAINT "bookdata_pkey" PRIMARY KEY ("ISBN10")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "username" TEXT,
    "email" TEXT NOT NULL,
    "googleId" TEXT NOT NULL,
    "lastName" TEXT,
    "picture" TEXT,
    "password" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "radius" INTEGER,
    "NotificationsCount" INTEGER NOT NULL DEFAULT 0,
    "phoneNumber" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bookdata_title_key" ON "bookdata"("title");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");
