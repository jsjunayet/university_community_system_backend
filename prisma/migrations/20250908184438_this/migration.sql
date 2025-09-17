/*
  Warnings:

  - The values [user] on the enum `userRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `userId` on the `user` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "userRole_new" AS ENUM ('student', 'admin', 'alumni', 'superAdmin');
ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "role" TYPE "userRole_new" USING ("role"::text::"userRole_new");
ALTER TYPE "userRole" RENAME TO "userRole_old";
ALTER TYPE "userRole_new" RENAME TO "userRole";
DROP TYPE "userRole_old";
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'student';
COMMIT;

-- DropIndex
DROP INDEX "user_userId_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "userId",
ALTER COLUMN "role" SET DEFAULT 'student';
