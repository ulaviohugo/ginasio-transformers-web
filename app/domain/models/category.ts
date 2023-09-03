import { ProductModel } from '.'

export interface CategoryModel {
	id: number
	name: string
	createdAt: Date
	createdById?: number
	updatedAt?: Date
	updatedById?: number
	products?: ProductModel[]
}
