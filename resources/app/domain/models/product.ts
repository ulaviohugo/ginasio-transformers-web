import { CategoryModel } from '.'

export interface ProductModel {
	id: number
	category_id: number
	name: string
	bar_code?: string
	photo?: string
	supplier_id?: string
	color?: string
	size?: string
	min_stock?: number
	max_stock?: number
	purchase_price?: number
	selling_price?: number
	created_at: Date
	user_id?: number
	updated_at?: Date
	user_id_update?: number

	category?: CategoryModel
}
