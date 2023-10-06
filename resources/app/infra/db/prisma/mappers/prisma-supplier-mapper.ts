import { Supplier as SupplierRaw } from '@prisma/client'

import { SupplierModel } from '@/domain/models'

export class PrismaSupplierMapper {
	static toPrisma(supplier: SupplierModel): SupplierRaw {
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
			createdAt: supplier.createdAt,
			createdById: supplier.createdById,
			updatedAt: supplier.updatedAt,
			updatedById: supplier.updatedById
		} as any
	}
}
