-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "userBookId" TEXT;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userBookId_fkey" FOREIGN KEY ("userBookId") REFERENCES "UserBooks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
