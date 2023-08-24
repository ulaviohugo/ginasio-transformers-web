-- DropForeignKey
ALTER TABLE `tb_purchases` DROP FOREIGN KEY `tb_purchases_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `tb_purchases` DROP FOREIGN KEY `tb_purchases_employee_id_fkey`;

-- DropForeignKey
ALTER TABLE `tb_purchases` DROP FOREIGN KEY `tb_purchases_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `tb_purchases` DROP FOREIGN KEY `tb_purchases_supplier_id_fkey`;

-- DropForeignKey
ALTER TABLE `tb_sales` DROP FOREIGN KEY `tb_sales_purchase_id_fkey`;

-- DropForeignKey
ALTER TABLE `tb_supplier_products` DROP FOREIGN KEY `tb_supplier_products_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `tb_supplier_products` DROP FOREIGN KEY `tb_supplier_products_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `tb_supplier_products` DROP FOREIGN KEY `tb_supplier_products_supplierId_fkey`;

-- AlterTable
ALTER TABLE `tb_purchases` MODIFY `employee_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `tb_supplier_products` ADD CONSTRAINT `tb_supplier_products_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `tb_suppliers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_supplier_products` ADD CONSTRAINT `tb_supplier_products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `tb_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_supplier_products` ADD CONSTRAINT `tb_supplier_products_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `tb_products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_purchases` ADD CONSTRAINT `tb_purchases_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `tb_suppliers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_purchases` ADD CONSTRAINT `tb_purchases_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `tb_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_purchases` ADD CONSTRAINT `tb_purchases_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `tb_products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_purchases` ADD CONSTRAINT `tb_purchases_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `tb_employees`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_sales` ADD CONSTRAINT `tb_sales_purchase_id_fkey` FOREIGN KEY (`purchase_id`) REFERENCES `tb_purchases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
