/*
  Warnings:

  - A unique constraint covering the columns `[nif]` on the table `tb_employees` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `tb_employees_nif_key` ON `tb_employees`(`nif`);
