import { EmployeePresenceModel } from '.'

export interface EmployeeModel {
	id: number
	photo?: string
	name: string
	gender: string
	date_of_birth: Date
	marital_status: string
	document_type: string
	document_number: string
	nif?: string
	social_security?: string
	dependents: number
	education_degree: string
	phone: string
	phone2?: string
	email: string
	user_name?: string
	password?: string
	password_confirmation?: string
	can_login: boolean
	role: 'Admin' | 'Normal'
	country_id: number
	province_id?: number
	municipality_id?: number
	address: string
	position: string
	base_salary: number
	hire_date: Date
	contract_end_date?: Date
	bank_name?: string
	iban?: string
	account_number?: string
	created_at: Date
	user_id?: number
	updated_at?: Date
	user_id_update?: number

	employee_presences: EmployeePresenceModel[]
}