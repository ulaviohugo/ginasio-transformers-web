/*
  Warnings:

  - You are about to drop the column `category_id` on the `tb_suppliers` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `tb_suppliers` table. All the data in the column will be lost.
  - You are about to drop the column `unit_price` on the `tb_suppliers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `tb_suppliers` DROP FOREIGN KEY `tb_suppliers_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `tb_suppliers` DROP FOREIGN KEY `tb_suppliers_product_id_fkey`;

-- AlterTable
ALTER TABLE `tb_suppliers` DROP COLUMN `category_id`,
    DROP COLUMN `product_id`,
    DROP COLUMN `unit_price`;

-- CreateTable
CREATE TABLE `tb_supplier_products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `supplierId` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `unit_price` DOUBLE NOT NULL,
    `created_by_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by_id` INTEGER NULL,
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_supplier_products` ADD CONSTRAINT `tb_supplier_products_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `tb_suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_supplier_products` ADD CONSTRAINT `tb_supplier_products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `tb_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_supplier_products` ADD CONSTRAINT `tb_supplier_products_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `tb_products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
