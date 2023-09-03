import { Customer as CustomerRaw } from '@prisma/client'

import { CustomerModel } from '@/app/domain/models'

export class PrismaCustomerMapper {
	static toPrisma(employee: CustomerModel): CustomerRaw {
		if (!employee) return null as any
		return {
			name: employee.name,
			photo: employee.photo,
			gender: employee.gender,
			dateOfBirth: employee.dateOfBirth,
			phone: employee.phone,
			email: employee.email,
			countryId: employee.countryId,
			provinceId: employee.provinceId,
			municipalityId: employee.municipalityId,
			residentialAddress: employee.residentialAddress,
			createdById: employee.createdById,
			createdAt: employee.createdAt,
			updatedById: employee.updatedById,
			updatedAt: employee.updatedAt
		} as any
	}

	static toDomain(employeeRaw: any): CustomerModel {
		if (!employeeRaw) return null as any
		return {
			name: employeeRaw.name,
			photo: employeeRaw.photo,
			gender: employeeRaw.gender,
			dateOfBirth: employeeRaw.dateOfBirth,
			phone: employeeRaw.phone,
			email: employeeRaw.email,
			countryId: employeeRaw.countryId,
			provinceId: employeeRaw.provinceId,
			municipalityId: employeeRaw.municipalityId,
			residentialAddress: employeeRaw.residentialAddress,
			createdById: employeeRaw.createdById,
			createdAt: employeeRaw.createdAt,
			updatedById: employeeRaw.updatedById,
			updatedAt: employeeRaw.updatedAt
		} as any
	}
}
