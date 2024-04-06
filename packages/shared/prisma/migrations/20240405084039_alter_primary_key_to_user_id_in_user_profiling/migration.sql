/*
  Warnings:

  - The primary key for the `user_profiling` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user_profiling` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `user_profiling` table. All the data in the column will be lost.
  - Made the column `user_id` on table `user_profiling` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "user_profiling_project_id_idx";

-- AlterTable
ALTER TABLE "user_profiling" DROP CONSTRAINT "user_profiling_pkey",
DROP COLUMN "id",
DROP COLUMN "project_id",
ALTER COLUMN "user_id" SET NOT NULL,
ADD CONSTRAINT "user_profiling_pkey" PRIMARY KEY ("user_id");
