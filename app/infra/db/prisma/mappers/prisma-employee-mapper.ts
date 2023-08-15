import { Employee as EmployeeRaw } from '@prisma/client'

import { Employee } from '@/app/domain/models'

export class PrismaEmployeeMapper {
	static toPrisma(employee: Employee): EmployeeRaw {
		if (!employee) return null as any
		return {
			id: employee.id,
			name: employee.name,
			image: employee.image,
			gender: employee.gender,
			dateOfBirth: employee.dateOfBirth,
			maritalStatus: employee.maritalStatus,
			documentType: employee.documentType,
			documentNumber: employee.documentNumber,
			nif: employee.nif,
			socialSecurity: employee.socialSecurity,
			dependents: employee.dependents,
			educationDegree: employee.educationDegree,
			phone1: employee.phone1,
			phone2: employee.phone2,
			email: employee.email,
			countryId: employee.countryId,
			provinceId: employee.provinceId,
			municipalityId: employee.municipalityId,
			residentialAddress: employee.residentialAddress,
			position: employee.position,
			baseSalary: employee.baseSalary,
			hireDate: employee.hireDate,
			contractEndDate: employee.contractEndDate,
			bankName: employee.bankName,
			iban: employee.iban,
			accountNumber: employee.accountNumber,
			createdBy: employee.createdBy,
			createdAt: employee.createdAt,
			updatedBy: employee.updatedBy,
			updatedAt: employee.updatedAt
		} as any
	}

	static toDomain(employeeRaw: EmployeeRaw): Employee {
		if (!employeeRaw) return null as any
		return {
			id: employeeRaw.id,
			name: employeeRaw.name,
			image: employeeRaw.image,
			gender: employeeRaw.gender,
			dateOfBirth: employeeRaw.dateOfBirth,
			maritalStatus: employeeRaw.maritalStatus,
			documentType: employeeRaw.documentType,
			documentNumber: employeeRaw.documentNumber,
			nif: employeeRaw.nif,
			socialSecurity: employeeRaw.socialSecurity,
			dependents: employeeRaw.dependents,
			educationDegree: employeeRaw.educationDegree,
			phone1: employeeRaw.phone1,
			phone2: employeeRaw.phone2,
			email: employeeRaw.email,
			countryId: employeeRaw.countryId,
			provinceId: employeeRaw.provinceId,
			municipalityId: employeeRaw.municipalityId,
			residentialAddress: employeeRaw.residentialAddress,
			position: employeeRaw.position,
			baseSalary: employeeRaw.baseSalary,
			hireDate: employeeRaw.hireDate,
			contractEndDate: employeeRaw.contractEndDate,
			bankName: employeeRaw.bankName,
			iban: employeeRaw.iban,
			accountNumber: employeeRaw.accountNumber,
			createdBy: employeeRaw.createdBy,
			createdAt: employeeRaw.createdAt,
			updatedBy: employeeRaw.updatedBy,
			updatedAt: employeeRaw.updatedAt
		} as any
	}
}
