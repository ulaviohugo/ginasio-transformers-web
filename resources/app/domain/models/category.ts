import { ProductModel } from '.'

export interface CategoryModel {
	id: number
	name: string
	created_at: Date
	user_id?: number
	updated_at?: Date
	user_id_update?: number
	products?: ProductModel[]
}
