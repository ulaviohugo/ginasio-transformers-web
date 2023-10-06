import { Employee as EmployeeRaw } from '@prisma/client'

import { EmployeeModel } from '@/domain/models'

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
			phone: employee.phone,
			phone2: employee.phone2,
			email: employee.email,
			userName: employee.userName,
			password: employee.password,
			canLogin: employee.canLogin,
			role: employee.role,
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

	static toDomain(employeeRaw: EmployeeRaw): EmployeeModel {
		if (!employeeRaw) return null as any
		return {
			...employeeRaw,
			password: undefined
		} as EmployeeModel
	}
}
