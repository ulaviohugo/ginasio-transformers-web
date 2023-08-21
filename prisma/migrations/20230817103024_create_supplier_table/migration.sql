-- CreateTable
CREATE TABLE `tb_suppliers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `representative` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `photo` VARCHAR(50) NULL,
    `country_id` INTEGER NOT NULL,
    `province_id` INTEGER NULL,
    `municipality_id` INTEGER NULL,
    `business_address` VARCHAR(150) NOT NULL,
    `category_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `unit_price` DOUBLE NOT NULL,
    `created_by` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` INTEGER NULL,
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_suppliers` ADD CONSTRAINT `tb_suppliers_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `tb_countries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_suppliers` ADD CONSTRAINT `tb_suppliers_province_id_fkey` FOREIGN KEY (`province_id`) REFERENCES `tb_provinces`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_suppliers` ADD CONSTRAINT `tb_suppliers_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `tb_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_suppliers` ADD CONSTRAINT `tb_suppliers_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `tb_products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
