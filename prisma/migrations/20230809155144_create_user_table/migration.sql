-- CreateTable
CREATE TABLE `tb_employees` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
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
    `countryId` INTEGER NOT NULL,
    `provinceId` INTEGER NULL,
    `municipalityId` INTEGER NULL,
    `residential_address` VARCHAR(150) NOT NULL,
    `position` VARCHAR(50) NOT NULL,
    `base_salary` DOUBLE NULL,
    `hire_date` DATE NOT NULL,
    `contract_end_date` DATE NULL,
    `bank_name` VARCHAR(30) NULL,
    `iban` VARCHAR(30) NULL,
    `account_number` VARCHAR(30) NULL,
    `created_by` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` INTEGER NULL,
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `tb_employees_nif_key`(`nif`),
    UNIQUE INDEX `tb_employees_social_security_key`(`social_security`),
    UNIQUE INDEX `tb_employees_email_key`(`email`),
    UNIQUE INDEX `tb_employees_bank_name_key`(`bank_name`),
    UNIQUE INDEX `tb_employees_iban_key`(`iban`),
    UNIQUE INDEX `tb_employees_account_number_key`(`account_number`),
    UNIQUE INDEX `tb_employees_document_type_document_number_key`(`document_type`, `document_number`),
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

    UNIQUE INDEX `tb_provinces_name_key`(`name`),
    UNIQUE INDEX `tb_provinces_name_country_id_key`(`name`, `country_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_municipalities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `province_id` INTEGER NOT NULL,

    UNIQUE INDEX `tb_municipalities_name_key`(`name`),
    UNIQUE INDEX `tb_municipalities_name_province_id_key`(`name`, `province_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_employees` ADD CONSTRAINT `tb_employees_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `tb_countries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_employees` ADD CONSTRAINT `tb_employees_provinceId_fkey` FOREIGN KEY (`provinceId`) REFERENCES `tb_provinces`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_employees` ADD CONSTRAINT `tb_employees_municipalityId_fkey` FOREIGN KEY (`municipalityId`) REFERENCES `tb_municipalities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_provinces` ADD CONSTRAINT `tb_provinces_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `tb_countries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_municipalities` ADD CONSTRAINT `tb_municipalities_province_id_fkey` FOREIGN KEY (`province_id`) REFERENCES `tb_provinces`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
