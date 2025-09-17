/*
  Warnings:

  - Added the required column `bkashNumber` to the `GroupTour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `GroupTour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GroupTour" ADD COLUMN     "bkashNumber" TEXT NOT NULL,
ADD COLUMN     "price" TEXT NOT NULL;
