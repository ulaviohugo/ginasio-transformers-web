import { Category } from '.'

export interface Product {
	id: number
	name: string
	image?: string
	categoryId: number
	category?: Category
	price: number
	createdAt: Date
	createdBy?: number
	updatedAt?: Date
	updatedBy?: number
}
