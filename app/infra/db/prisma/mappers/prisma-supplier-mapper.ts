import { Supplier as SupplierRaw } from '@prisma/client'

import { Supplier } from '@/app/domain/models'

export class PrismaSupplierMapper {
	static toPrisma(supplier: Supplier): SupplierRaw {
		if (!supplier) return null as any
		return {
			id: supplier.id,
			name: supplier.name,
			representative: supplier.representative,
			email: supplier.email,
			phone: supplier.phone,
			photo: supplier.photo,
			countryId: supplier.countryId,
			provinceId: supplier.provinceId,
			municipalityId: supplier.municipalityId,
			businessAddress: supplier.businessAddress,
			categoryId: supplier.categoryId,
			productId: supplier.productId,
			unitPrice: supplier.unitPrice,
			createdAt: supplier.createdAt,
			createdBy: supplier.createdBy,
			updatedAt: supplier.updatedAt,
			updatedBy: supplier.updatedBy
		} as any
	}
}