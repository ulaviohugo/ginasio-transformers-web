-- CreateTable
CREATE TABLE `tb_sales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `photo` VARCHAR(100) NULL,
    `purchase_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `total_value` DOUBLE NOT NULL,
    `unit_price` DOUBLE NOT NULL,
    `discount` DOUBLE NOT NULL,
    `payment_method` VARCHAR(191) NOT NULL,
    `employee_id` INTEGER NOT NULL,
    `created_by` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` INTEGER NULL,
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_sales` ADD CONSTRAINT `tb_sales_purchase_id_fkey` FOREIGN KEY (`purchase_id`) REFERENCES `tb_purchases`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
