import { CategoryModel, EmployeeModel, ProductModel, SupplierModel } from '.'

export interface PurchaseModel {
	id: number
	photo?: string
	lot?: string
	bar_code?: string
	supplier_id: number
	category_id: number
	product_id: number
	color: string
	size: string
	unit_price: number
	quantity: number
	total_value: number
	payment_method: string
	paid: boolean
	purchase_date: Date
	due_date?: Date
	employee_id: number
	created_at: Date
	user_id?: number
	updated_at?: Date
	user_id_update?: number

	supplier?: SupplierModel
	category?: CategoryModel
	product?: ProductModel
	employee?: EmployeeModel
}
