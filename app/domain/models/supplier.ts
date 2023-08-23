import { Category, Product } from '.'

export interface Supplier {
	id: number
	name: string
	representative: string
	email: string
	phone: string
	photo?: string
	countryId: number
	provinceId?: number
	municipalityId?: number
	businessAddress: string
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
