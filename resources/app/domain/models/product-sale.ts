import { CategoryModel, CustomerModel, EmployeeModel, ProductModel, SaleModel } from '.'

export type ProductSaleModel = {
	id: number
	product_id: number
	saleId: number
	quantity: number
	total_value: number
	unit_price: number
	amount_paid: number
	color?: string
	size?: string
	discount: number
	employee_id: number
	created_at: Date
	user_id?: number
	updated_at?: Date
	user_id_update?: number

	product: ProductModel
	sale: SaleModel
	category: CategoryModel
	customer?: CustomerModel
	employee: EmployeeModel
}
