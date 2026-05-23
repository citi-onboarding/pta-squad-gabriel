/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Emprestimo" ALTER COLUMN "status" SET DEFAULT 'Em_andamento';

-- AlterTable
ALTER TABLE "Livro" ADD COLUMN     "foto_url" TEXT;

-- DropTable
DROP TABLE "Test";

-- DropTable
DROP TABLE "User";
