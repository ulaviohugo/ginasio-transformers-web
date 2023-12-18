import { EmployeeModel } from './employee'

export type WorkStatementModel = {
	id: number
	file_path: string
	employee_id: number
	purpose: string

	user_id: number
	created_at: Date
	user_id_update: number
	updated_at: Date

	employee?: EmployeeModel
	user?: EmployeeModel
}
