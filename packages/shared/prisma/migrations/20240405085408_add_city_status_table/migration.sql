-- CreateTable
CREATE TABLE "city_status" (
    "uuid" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "current" TEXT,
    "previous" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "city_status_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE INDEX "city_status_user_id_idx" ON "city_status"("user_id");
