import { Category } from '.'

export interface Product {
	id: number
	name: string
	photo?: string
	categoryId: number
	category?: Category
	price: number
	createdAt: Date
	createdById?: number
	updatedAt?: Date
	updatedById?: number
}
