import { Employee as EmployeeRaw } from '@prisma/client'

import { EmployeeModel } from '@/domain/models'

export class PrismaEmployeeMapper {
	static toPrisma(employee: EmployeeModel): EmployeeRaw {
		if (!employee) return null as any
		return {
			name: employee.name,
			photo: employee.photo,
			gender: employee.gender,
			date_of_birth: employee.date_of_birth,
			marital_status: employee.marital_status,
			document_type: employee.document_type,
			document_number: employee.document_number,
			nif: employee.nif,
			social_security: employee.social_security,
			dependents: employee.dependents,
			education_degree: employee.education_degree,
			phone: employee.phone,
			phone2: employee.phone2,
			email: employee.email,
			user_name: employee.user_name,
			password: employee.password,
			can_login: employee.can_login,
			role: employee.role,
			country_id: employee.country_id,
			province_id: employee.province_id,
			municipality_id: employee.municipality_id,
			address: employee.address,
			position: employee.position,
			base_salary: employee.base_salary,
			hire_date: employee.hire_date,
			contract_end_date: employee.contract_end_date,
			bank_name: employee.bank_name || null,
			iban: employee.iban || null,
			account_number: employee.account_number || null,
			user_id: employee.user_id,
			created_at: employee.created_at,
			user_id_update: employee.user_id_update,
			updated_at: employee.updated_at
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
