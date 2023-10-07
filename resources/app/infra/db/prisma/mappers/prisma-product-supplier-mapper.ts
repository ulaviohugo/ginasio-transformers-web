import { SupplierProduct as SupplierProductRaw } from '@prisma/client'

import { SupplierProductModel } from '@/domain/models'

export class PrismaSupplierProductMapper {
	static toPrisma(supplier: SupplierProductModel): SupplierProductRaw {
		if (!supplier) return null as any
		return {
			id: supplier.id,
			supplier_id: supplier.supplier_id,
			category_id: supplier.category_id,
			product_id: supplier.product_id,
			unit_price: supplier.unit_price,
			created_at: supplier.created_at,
			user_id: supplier.user_id,
			updated_at: supplier.updated_at,
			user_id_update: supplier.user_id_update
		} as any
	}
}
