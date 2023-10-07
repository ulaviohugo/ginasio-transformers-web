import { CategoryModel, ProductModel } from '.'

export interface SupplierProductModel {
	id: number
	supplier_id: number
	category_id: number
	product_id: number
	unit_price: number
	category?: CategoryModel
	product?: ProductModel
	created_at: Date
	user_id?: number
	updated_at?: Date
	user_id_update?: number
}
