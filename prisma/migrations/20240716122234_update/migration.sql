/*
  Warnings:

  - Made the column `url` on table `CrawlBaseModel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CrawlBaseModel" ALTER COLUMN "url" SET NOT NULL;
