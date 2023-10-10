import { EmployeeModel } from '.'

export interface EmployeePresenceModel {
	id: number
	employee_id: number
	date: Date
	entry_time: string
	exit_time: string
	delay_duration: string
	presence_status: PresentStatus
	description?: string
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
