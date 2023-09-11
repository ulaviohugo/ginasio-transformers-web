import { EmployeeModel } from '.'

export interface EmployeePresenceModel {
	id: number
	employeeId: number
	date: Date
	presenceStatus: PresentStatus
	createdAt: Date
	createdById?: number
	updatedAt?: Date
	updatedById?: number

	employee?: EmployeeModel
}

export enum PresentStatus {
	F = 'F',
	P = 'P'
}
