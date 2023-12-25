import { EmployeeModel } from './employee'

export type AdmissionModel = {
	id: number
	file_path: string
	employee_id: number
	working_tools: string[]
	clothes_production_training: string[]

	user_id: number
	created_at: Date
	user_id_update: number
	updated_at: Date

	employee?: EmployeeModel
	user?: EmployeeModel
}
