import { CustomerModel, EmployeeModel, ProductSaleModel } from '.'

export interface SaleModel {
	id: number
	customer_id?: number
	total_value: number
	amount_paid: number
	discount: number
	employee_id?: number
	payment_method: string

	created_at: Date
	user_id?: number
	updated_at?: Date
	user_id_update?: number

	employee?: EmployeeModel
	user?: EmployeeModel
	customer?: CustomerModel
	product_sales: ProductSaleModel[]
}
