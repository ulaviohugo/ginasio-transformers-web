export interface Product {
	id: number
	name: string
	image?: string
	categoryId: number
	price: number
	createdAt: Date
	createdBy?: number
	updatedAt?: Date
	updatedBy?: number
}
