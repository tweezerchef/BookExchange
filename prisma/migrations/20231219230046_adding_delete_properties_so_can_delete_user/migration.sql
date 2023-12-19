-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserBooks" DROP CONSTRAINT "UserBooks_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserHobbies" DROP CONSTRAINT "UserHobbies_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserPictures" DROP CONSTRAINT "UserPictures_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserPlaces" DROP CONSTRAINT "UserPlaces_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserBooks" ADD CONSTRAINT "UserBooks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHobbies" ADD CONSTRAINT "UserHobbies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPictures" ADD CONSTRAINT "UserPictures_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlaces" ADD CONSTRAINT "UserPlaces_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
