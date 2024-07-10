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
	department: string
	position: string
	gym_id: number
	base_salary: number
	meal_allowance?: number
	productivity_allowance?: number
	transportation_allowance?: number
	family_allowance?: number
	hire_date: Date | null
	contract_end_date?: Date | null
	bank_name?: string
	iban?: string
	account_number?: string
	created_at: Date
	user_id?: number
	updated_at?: Date
	user_id_update?: number
}
