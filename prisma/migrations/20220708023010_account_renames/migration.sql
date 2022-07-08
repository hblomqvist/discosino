/*
  Warnings:

  - The primary key for the `accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `money_amount` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `token_amount` on the `accounts` table. All the data in the column will be lost.
  - Added the required column `id` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_owner_id_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_pkey",
DROP COLUMN "money_amount",
DROP COLUMN "owner_id",
DROP COLUMN "token_amount",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD COLUMN     "money_string" TEXT NOT NULL DEFAULT '0',
ADD COLUMN     "token_string" TEXT NOT NULL DEFAULT '0',
ADD CONSTRAINT "accounts_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_id_fkey" FOREIGN KEY ("id") REFERENCES "members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
