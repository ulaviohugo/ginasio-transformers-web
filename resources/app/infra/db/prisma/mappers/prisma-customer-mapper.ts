import { Customer as CustomerRaw } from '@prisma/client'

import { CustomerModel } from '@/domain/models'

export class PrismaCustomerMapper {
	static toPrisma(employee: CustomerModel): CustomerRaw {
		if (!employee) return null as any
		return {
			name: employee.name,
			photo: employee.photo,
			gender: employee.gender,
			date_of_birth: employee.date_of_birth,
			phone: employee.phone,
			email: employee.email,
			country_id: employee.country_id,
			province_id: employee.province_id,
			municipality_id: employee.municipality_id,
			address: employee.address,
			user_id: employee.user_id,
			created_at: employee.created_at,
			user_id_update: employee.user_id_update,
			updated_at: employee.updated_at
		} as any
	}

	static toDomain(employeeRaw: any): CustomerModel {
		if (!employeeRaw) return null as any
		return {
			name: employeeRaw.name,
			photo: employeeRaw.photo,
			gender: employeeRaw.gender,
			date_of_birth: employeeRaw.date_of_birth,
			phone: employeeRaw.phone,
			email: employeeRaw.email,
			country_id: employeeRaw.country_id,
			province_id: employeeRaw.province_id,
			municipality_id: employeeRaw.municipality_id,
			address: employeeRaw.address,
			user_id: employeeRaw.user_id,
			created_at: employeeRaw.created_at,
			user_id_update: employeeRaw.user_id_update,
			updated_at: employeeRaw.updated_at
		} as any
	}
}
