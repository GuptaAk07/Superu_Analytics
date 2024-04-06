-- CreateTable
CREATE TABLE "interests_status" (
    "uuid" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "current" TEXT,
    "previous" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "interests_status_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE INDEX "interests_status_user_id_idx" ON "interests_status"("user_id");
