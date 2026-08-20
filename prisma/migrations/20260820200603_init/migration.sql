/*
  Warnings:

  - Added the required column `categoria` to the `FeedBack` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resposta` to the `FeedBack` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sentimento` to the `FeedBack` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FeedBack" ADD COLUMN     "categoria" TEXT NOT NULL,
ADD COLUMN     "resposta" TEXT NOT NULL,
ADD COLUMN     "sentimento" TEXT NOT NULL;
