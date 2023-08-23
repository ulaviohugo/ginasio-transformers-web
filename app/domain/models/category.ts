import { Product } from '.'

export interface Category {
	id: number
	name: string
	createdAt: Date
	createdById?: number
	updatedAt?: Date
	updatedById?: number
	products?: Product[]
}
