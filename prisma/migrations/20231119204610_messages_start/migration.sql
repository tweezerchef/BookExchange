-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isOnline" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "DirectMessages_createdAt_idx" ON "DirectMessages"("createdAt");
