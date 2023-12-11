import { CustomerModel } from './customer'
import { EmployeeModel } from './employee'
import { ProductSaleModel } from './product-sale'
import { ProductionCategoryModel } from './production-category'
import { ProductionProductModel } from './production-product'

export type ProductionProductSaleModel = {
	id: number
	end_product: string
	category_id: number
	product_id: number
	lot: string | number
	saleId: number
	quantity: number
	total_value: number
	unit_price: number
	amount_paid: number
	color?: string
	size?: string
	balance: number
	employee_id: number
	created_at: Date
	user_id?: number
	updated_at?: Date
	user_id_update?: number

	product: ProductionProductModel
	sale: ProductSaleModel
	category: ProductionCategoryModel
	customer?: CustomerModel
	employee: EmployeeModel
}
