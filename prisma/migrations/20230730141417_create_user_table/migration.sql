-- CreateTable
CREATE TABLE "tb_employees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL,
    "hireDate" DATETIME NOT NULL,
    "maritalStatus" TEXT NOT NULL,
    "educationDegree" TEXT NOT NULL,
    "phone1" TEXT NOT NULL,
    "phone2" TEXT,
    "email" TEXT NOT NULL,
    "residentialAddress" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "nif" TEXT NOT NULL,
    "dependents" INTEGER NOT NULL DEFAULT 0,
    "socialSecurity" TEXT,
    "position" TEXT NOT NULL,
    "baseSalary" REAL,
    "contractEndDate" DATETIME,
    "workTime" TEXT,
    "iban" TEXT,
    "accountNumber" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_employees_phone1_key" ON "tb_employees"("phone1");

-- CreateIndex
CREATE UNIQUE INDEX "tb_employees_phone2_key" ON "tb_employees"("phone2");

-- CreateIndex
CREATE UNIQUE INDEX "tb_employees_email_key" ON "tb_employees"("email");
