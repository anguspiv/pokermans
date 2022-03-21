/*
  Warnings:

  - Added the required column `uploadUser` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "uploadUser" TEXT NOT NULL;
