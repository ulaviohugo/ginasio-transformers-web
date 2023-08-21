/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `tb_suppliers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `tb_suppliers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `tb_purchases` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `photo` VARCHAR(50) NULL,
    `supplier_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `color` VARCHAR(20) NOT NULL,
    `size` VARCHAR(20) NOT NULL,
    `unit_price` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL,
    `total_value` DOUBLE NOT NULL,
    `payment_method` VARCHAR(191) NOT NULL,
    `paid` BOOLEAN NOT NULL,
    `purchase_date` DATETIME(3) NOT NULL,
    `due_date` DATETIME(3) NOT NULL,
    `employee_id` INTEGER NOT NULL,
    `created_by` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` INTEGER NULL,
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `tb_suppliers_email_key` ON `tb_suppliers`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `tb_suppliers_phone_key` ON `tb_suppliers`(`phone`);

-- AddForeignKey
ALTER TABLE `tb_purchases` ADD CONSTRAINT `tb_purchases_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `tb_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_purchases` ADD CONSTRAINT `tb_purchases_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `tb_products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_purchases` ADD CONSTRAINT `tb_purchases_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `tb_suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_purchases` ADD CONSTRAINT `tb_purchases_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `tb_employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
