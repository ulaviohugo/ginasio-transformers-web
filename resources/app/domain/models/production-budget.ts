import { ProductionAccessoryModel } from './accessory'
import { CustomerModel } from './customer'
import { EmployeeModel } from './employee'
import { ProductionFabricModel } from './fabric'

export type ProductionBudgetModel = {
	id: number
	end_product: string
	photo: string
	date: Date
	customer_id: number
	customer_rating: string
	cutting_employee_id: number
	cutting_cost: number
	cutting_duration_per_minute: number
	sewing_employee_id: number
	sewing_cost: number
	sewing_duration_per_minute: number
	variable_cost: number
	finishing_cost: number
	production_cost: number
	selling_cost: number
	discount: number
	total_to_pay: number

	customer: CustomerModel
	cutting_employee: EmployeeModel
	sewing_employee: EmployeeModel
	production_accessories: ProductionAccessoryModel[]
	production_fabrics: ProductionFabricModel[]

	created_at: Date
	user_id?: number
	updated_at?: Date
	user_id_update?: number
}
