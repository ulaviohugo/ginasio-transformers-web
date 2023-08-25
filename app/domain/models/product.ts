import { Category } from '.'

export interface Product {
	id: number
	name: string
	barCode: string
	photo?: string
	categoryId: number
	price: number
	category?: Category
	createdAt: Date
	createdById?: number
	updatedAt?: Date
	updatedById?: number
}
