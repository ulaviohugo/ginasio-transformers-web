import { EmployeeModel } from './employee'

export type AthleteModel = {
	id: number
	name: string
	date_of_birth: Date
	gender: string
	marital_status: string
	document_type: string
	document_number: string
	photo: string
	phone: string
	phone2?: string
	email?: string
	observation?: string
	health_history?: string
	education_degree?: string
	starting_weight?: number
	current_weight?: number
	goal_weight?: number
	status: 'active' | 'inactive'
	country_id?: number
	province_id?: number
	municipality_id?: number
	address: string
	user_id: number
	user_id_update: number
	created_at: Date

	user?: EmployeeModel
}
