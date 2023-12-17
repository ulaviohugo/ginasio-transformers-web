import { EmployeeModel } from './employee'

export type SalaryReceiptModel = {
	id: number
	employee_id: number
	file_path: string
	work_days: number
	year: number
	month: number
	observation?: string
	base_salary: number
	base_salary_received: number
	net_salary: number
	gross_salary: number
	meal_allowance: number
	productivity_allowance: number
	transportation_allowance: number
	family_allowance: number
	christmas_allowance: number
	holiday_allowance: number
	total_salary_discounts: number
	inss_discount: number
	inss_discount_percent: number
	irt_discount: number
	irt_discount_percent: number

	created_at: Date
	user_id?: number
	updated_at?: Date
	user_id_update?: number

	employee?: EmployeeModel
	user?: EmployeeModel
}
