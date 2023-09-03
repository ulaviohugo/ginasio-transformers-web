import { CategoryModel } from '.'

export interface ProductModel {
	id: number
	name: string
	barCode?: string
	photo?: string
	categoryId: number
	price: number
	category?: CategoryModel
	createdAt: Date
	createdById?: number
	updatedAt?: Date
	updatedById?: number
}
