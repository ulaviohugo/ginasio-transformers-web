import { Product } from '.'

export interface Category {
	id: number
	name: string
	createdAt: Date
	createdBy?: number
	updatedAt?: Date
	updatedBy?: number
	products?: Product[]
}
