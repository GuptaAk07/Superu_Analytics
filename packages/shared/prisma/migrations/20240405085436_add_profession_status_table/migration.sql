-- CreateTable
CREATE TABLE "profession_status" (
    "uuid" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "current" TEXT,
    "previous" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profession_status_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE INDEX "profession_status_user_id_idx" ON "profession_status"("user_id");
