-- CreateTable
CREATE TABLE "CrawlBaseModel" (
    "id" TEXT NOT NULL,
    "original_status" INTEGER,
    "pc_status" INTEGER,
    "url" TEXT,
    "body" TEXT,

    CONSTRAINT "CrawlBaseModel_pkey" PRIMARY KEY ("id")
);
