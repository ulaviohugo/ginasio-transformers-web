import { Category, Product } from '.'

export interface SupplierProduct {
	id: number
	supplierId: number
	categoryId: number
	productId: number
	unitPrice: number
	category?: Category
	product?: Product
	createdAt: Date
	createdById?: number
	updatedAt?: Date
	updatedById?: number
}
