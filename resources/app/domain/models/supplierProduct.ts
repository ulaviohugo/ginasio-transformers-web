import { CategoryModel, ProductModel } from '.'

export interface SupplierProductModel {
	id: number
	supplierId: number
	categoryId: number
	productId: number
	unitPrice: number
	category?: CategoryModel
	product?: ProductModel
	createdAt: Date
	createdById?: number
	updatedAt?: Date
	updatedById?: number
}
