import { EmployeeModel } from './employee'

export type AbsenceJustificationModel = {
	id: number
	employee_id: number
	file_path: string
	starts_at: Date
	ends_at: Date
	absent_days: number
	absence_reason: string
	absence_description: string
	adicional_information: string

	created_at: Date
	user_id?: number
	updated_at?: Date
	user_id_update?: number

	employee?: EmployeeModel
	user?: EmployeeModel
}
