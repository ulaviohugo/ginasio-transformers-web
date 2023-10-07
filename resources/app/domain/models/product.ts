import { CategoryModel } from '.'

export interface ProductModel {
	id: number
	name: string
	bar_code?: string
	photo?: string
	category_id: number
	price: number
	created_at: Date
	user_id?: number
	updated_at?: Date
	user_id_update?: number

	category?: CategoryModel
}