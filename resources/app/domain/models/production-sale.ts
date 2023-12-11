import { EmployeeModel, ProductionProductSaleModel } from '.'

export interface ProductionSaleModel {
	id: number
	end_product: string
	total_value: number
	amount_paid: number
	balance: string
	quantity: string
	employee_id: number
	payment_method: string

	created_at: Date
	user_id?: number
	updated_at?: Date
	user_id_update?: number

	invoice?: string

	employee?: EmployeeModel
	user?: EmployeeModel
	product_sales: ProductionProductSaleModel[]
}
