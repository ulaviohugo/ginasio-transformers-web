import { Category, Product, SupplierProduct } from '.'

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
	createdAt: Date
	createdById?: number
	updatedAt?: Date
	updatedById?: number

	supplierProducts?: SupplierProduct[]
}
