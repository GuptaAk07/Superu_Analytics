-- CreateTable
CREATE TABLE "gender_status" (
    "uuid" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "current" TEXT,
    "current_confidence_score" DOUBLE PRECISION,
    "previous" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gender_status_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE INDEX "gender_status_user_id_idx" ON "gender_status"("user_id");
