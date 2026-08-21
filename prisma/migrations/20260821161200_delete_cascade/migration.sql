-- DropForeignKey
ALTER TABLE "FeedBack" DROP CONSTRAINT "FeedBack_userId_fkey";

-- AddForeignKey
ALTER TABLE "FeedBack" ADD CONSTRAINT "FeedBack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
