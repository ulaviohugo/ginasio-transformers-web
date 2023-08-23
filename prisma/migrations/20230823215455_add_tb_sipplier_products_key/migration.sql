/*
  Warnings:

  - A unique constraint covering the columns `[supplierId,category_id,product_id]` on the table `tb_supplier_products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `tb_supplier_products_supplierId_category_id_product_id_key` ON `tb_supplier_products`(`supplierId`, `category_id`, `product_id`);
