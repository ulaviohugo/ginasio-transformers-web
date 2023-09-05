import { Employee as EmployeeRaw } from '@prisma/client'

import { EmployeeModel } from '@/app/domain/models'

export class PrismaEmployeeMapper {
	static toPrisma(employee: EmployeeModel): EmployeeRaw {
		if (!employee) return null as any
		return {
			name: employee.name,
			photo: employee.photo,
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
			userName: employee.userName,
			password: employee.password,
			canLogin: employee.canLogin,
			countryId: employee.countryId,
			provinceId: employee.provinceId,
			municipalityId: employee.municipalityId,
			residentialAddress: employee.residentialAddress,
			position: employee.position,
			baseSalary: employee.baseSalary,
			hireDate: employee.hireDate,
			contractEndDate: employee.contractEndDate,
			bankName: employee.bankName || null,
			iban: employee.iban || null,
			accountNumber: employee.accountNumber || null,
			createdById: employee.createdById,
			createdAt: employee.createdAt,
			updatedById: employee.updatedById,
			updatedAt: employee.updatedAt
		} as any
	}

	static toDomain(employeeRaw: any): EmployeeModel {
		if (!employeeRaw) return null as any
		return {
			id: employeeRaw.id,
			name: employeeRaw.name,
			photo: employeeRaw.photo,
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
			canLogin: employeeRaw.canLogin,
			userName: employeeRaw.userName,
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
			createdById: employeeRaw.createdById,
			createdAt: employeeRaw.createdAt,
			updatedById: employeeRaw.updatedById,
			updatedAt: employeeRaw.updatedAt
		} as any
	}
}
