import { EmployeePresence as EmployeePresenceRaw } from '@prisma/client'

import { EmployeePresenceModel } from '@/domain/models'

export class PrismaEmployeePresenceMapper {
	static toPrisma(employeePresence: EmployeePresenceModel): EmployeePresenceRaw {
		if (!employeePresence) return null as any
		return {
			employeeId: employeePresence.employeeId,
			presenceStatus: employeePresence.presenceStatus,
			date: employeePresence.date,
			createdById: employeePresence.createdById,
			createdAt: employeePresence.createdAt,
			updatedById: employeePresence.updatedById,
			updatedAt: employeePresence.updatedAt
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
