import { EmployeeModel } from '.'

export interface EmployeePresenceModel {
	id: number
	employeeId: number
	date: Date
	presenceStatus: 'F' | 'P'
	createdAt: Date
	createdById?: number
	updatedAt?: Date
	updatedById?: number

	employee?: EmployeeModel
}
