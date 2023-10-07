import { EmployeeModel } from '.'

export interface EmployeePresenceModel {
	id: number
	employee_id: number
	date: Date
	presence_status: PresentStatus
	created_at: Date
	user_id?: number
	updated_at?: Date
	user_id_update?: number

	employee?: EmployeeModel
}

export enum PresentStatus {
	F = 'F',
	P = 'P'
}
