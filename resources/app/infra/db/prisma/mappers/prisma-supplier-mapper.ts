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
			country_id: supplier.country_id,
			province_id: supplier.province_id,
			municipality_id: supplier.municipality_id,
			address: supplier.address,
			created_at: supplier.created_at,
			user_id: supplier.user_id,
			updated_at: supplier.updated_at,
			user_id_update: supplier.user_id_update
		} as any
	}
}
