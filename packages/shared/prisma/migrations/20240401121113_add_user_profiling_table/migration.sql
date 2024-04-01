-- CreateTable
CREATE TABLE "user_profiling" (
    "id" TEXT NOT NULL,
    "age" TEXT,
    "user_id" TEXT,
    "gender" TEXT,
    "interests" TEXT,
    "city" TEXT,
    "profession" TEXT,
    "relationship_status" TEXT,
    "project_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_profiling_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_profiling_project_id_idx" ON "user_profiling"("project_id");

-- CreateIndex
CREATE INDEX "user_profiling_user_id_idx" ON "user_profiling"("user_id");
