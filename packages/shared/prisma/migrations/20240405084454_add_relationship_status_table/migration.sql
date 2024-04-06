-- CreateTable
CREATE TABLE "relationship_status" (
    "uuid" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "current" TEXT,
    "previous" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "relationship_status_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE INDEX "relationship_status_user_id_idx" ON "relationship_status"("user_id");
