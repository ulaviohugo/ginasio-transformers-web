import { EmployeePresence as EmployeePresenceRaw } from '@prisma/client'

import { EmployeePresenceModel } from '@/domain/models'

export class PrismaEmployeePresenceMapper {
	static toPrisma(employeePresence: EmployeePresenceModel): EmployeePresenceRaw {
		if (!employeePresence) return null as any
		return {
			employee_id: employeePresence.employee_id,
			presence_status: employeePresence.presence_status,
			date: employeePresence.date,
			user_id: employeePresence.user_id,
			created_at: employeePresence.created_at,
			user_id_update: employeePresence.user_id_update,
			updated_at: employeePresence.updated_at
		} as any
	}

	static toDomain(employeePresenceRaw: EmployeePresenceRaw): EmployeePresenceModel {
		if (!employeePresenceRaw) return null as any
		return {
			...employeePresenceRaw,
			password: undefined
		} as EmployeePresenceModel
	}
}
