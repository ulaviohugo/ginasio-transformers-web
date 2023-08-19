/*
  Warnings:

  - You are about to drop the column `image` on the `tb_employees` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `tb_products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tb_employees` DROP COLUMN `image`,
    ADD COLUMN `photo` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `tb_products` DROP COLUMN `image`,
    ADD COLUMN `photo` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `tb_purchases` MODIFY `photo` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `tb_suppliers` MODIFY `photo` VARCHAR(100) NULL;
