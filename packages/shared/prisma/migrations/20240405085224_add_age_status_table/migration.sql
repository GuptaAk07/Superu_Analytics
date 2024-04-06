-- CreateTable
CREATE TABLE "age_status" (
    "uuid" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "current" INTEGER,
    "previous" INTEGER,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "age_status_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE INDEX "age_status_user_id_idx" ON "age_status"("user_id");
