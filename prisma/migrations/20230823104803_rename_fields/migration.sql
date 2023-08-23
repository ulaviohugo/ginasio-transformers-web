-- CreateTable
CREATE TABLE `tb_employees` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `photo` VARCHAR(100) NULL,
    `gender` VARCHAR(10) NOT NULL,
    `date_of_birth` DATE NOT NULL,
    `marital_status` VARCHAR(15) NOT NULL,
    `document_type` VARCHAR(30) NOT NULL,
    `document_number` VARCHAR(30) NOT NULL,
    `nif` VARCHAR(20) NULL,
    `social_security` VARCHAR(20) NULL,
    `dependents` INTEGER NOT NULL DEFAULT 0,
    `education_degree` VARCHAR(50) NOT NULL,
    `phone1` VARCHAR(15) NOT NULL,
    `phone2` VARCHAR(15) NULL,
    `email` VARCHAR(50) NOT NULL,
    `user_name` VARCHAR(64) NULL,
    `password` VARCHAR(64) NULL,
    `can_login` BOOLEAN NOT NULL DEFAULT false,
    `country_id` INTEGER NOT NULL,
    `province_id` INTEGER NULL,
    `municipality_id` INTEGER NULL,
    `residential_address` VARCHAR(150) NOT NULL,
    `position` VARCHAR(50) NOT NULL,
    `base_salary` DOUBLE NULL,
    `hire_date` DATE NOT NULL,
    `contract_end_date` DATE NULL,
    `bank_name` VARCHAR(30) NULL,
    `iban` VARCHAR(30) NULL,
    `account_number` VARCHAR(30) NULL,
    `created_by_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by_id` INTEGER NULL,
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `tb_employees_nif_key`(`nif`),
    UNIQUE INDEX `tb_employees_social_security_key`(`social_security`),
    UNIQUE INDEX `tb_employees_email_key`(`email`),
    UNIQUE INDEX `tb_employees_iban_key`(`iban`),
    UNIQUE INDEX `tb_employees_document_type_document_number_key`(`document_type`, `document_number`),
    UNIQUE INDEX `tb_employees_bank_name_account_number_key`(`bank_name`, `account_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_countries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `tb_countries_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_provinces` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `country_id` INTEGER NOT NULL,

    UNIQUE INDEX `tb_provinces_name_country_id_key`(`name`, `country_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_municipalities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `province_id` INTEGER NOT NULL,

    UNIQUE INDEX `tb_municipalities_name_province_id_key`(`name`, `province_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `created_by_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by_id` INTEGER NULL,
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `tb_categories_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(70) NOT NULL,
    `photo` VARCHAR(100) NULL,
    `category_id` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `created_by_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by_id` INTEGER NULL,
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `tb_products_name_category_id_key`(`name`, `category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_suppliers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `representative` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `photo` VARCHAR(100) NULL,
    `country_id` INTEGER NOT NULL,
    `province_id` INTEGER NULL,
    `municipality_id` INTEGER NULL,
    `business_address` VARCHAR(150) NOT NULL,
    `category_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `unit_price` DOUBLE NOT NULL,
    `created_by_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by_id` INTEGER NULL,
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `tb_suppliers_email_key`(`email`),
    UNIQUE INDEX `tb_suppliers_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_purchases` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `photo` VARCHAR(100) NULL,
    `supplier_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `color` VARCHAR(20) NOT NULL,
    `size` VARCHAR(20) NOT NULL,
    `unit_price` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL,
    `total_value` DOUBLE NOT NULL,
    `payment_method` VARCHAR(191) NOT NULL,
    `selling_price_unit` DOUBLE NOT NULL DEFAULT 0,
    `paid` BOOLEAN NOT NULL,
    `purchase_date` DATE NOT NULL,
    `due_date` DATE NULL,
    `employee_id` INTEGER NOT NULL,
    `created_by_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by_id` INTEGER NULL,
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_sales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `purchase_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `total_value` DOUBLE NOT NULL,
    `unit_price` DOUBLE NOT NULL,
    `discount` DOUBLE NOT NULL,
    `payment_method` VARCHAR(191) NOT NULL,
    `employee_id` INTEGER NOT NULL,
    `created_by_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by_id` INTEGER NULL,
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_employees` ADD CONSTRAINT `tb_employees_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `tb_countries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_employees` ADD CONSTRAINT `tb_employees_province_id_fkey` FOREIGN KEY (`province_id`) REFERENCES `tb_provinces`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_employees` ADD CONSTRAINT `tb_employees_municipality_id_fkey` FOREIGN KEY (`municipality_id`) REFERENCES `tb_municipalities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_provinces` ADD CONSTRAINT `tb_provinces_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `tb_countries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_municipalities` ADD CONSTRAINT `tb_municipalities_province_id_fkey` FOREIGN KEY (`province_id`) REFERENCES `tb_provinces`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_products` ADD CONSTRAINT `tb_products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `tb_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_suppliers` ADD CONSTRAINT `tb_suppliers_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `tb_countries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_suppliers` ADD CONSTRAINT `tb_suppliers_province_id_fkey` FOREIGN KEY (`province_id`) REFERENCES `tb_provinces`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_suppliers` ADD CONSTRAINT `tb_suppliers_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `tb_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_suppliers` ADD CONSTRAINT `tb_suppliers_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `tb_products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_purchases` ADD CONSTRAINT `tb_purchases_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `tb_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_purchases` ADD CONSTRAINT `tb_purchases_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `tb_products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_purchases` ADD CONSTRAINT `tb_purchases_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `tb_suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_purchases` ADD CONSTRAINT `tb_purchases_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `tb_employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_sales` ADD CONSTRAINT `tb_sales_purchase_id_fkey` FOREIGN KEY (`purchase_id`) REFERENCES `tb_purchases`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
