/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `CrawlBaseModel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CrawlBaseModel_url_key" ON "CrawlBaseModel"("url");
