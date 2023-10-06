import { SupplierProduct as SupplierProductRaw } from '@prisma/client'

import { SupplierProductModel } from '@/domain/models'

export class PrismaSupplierProductMapper {
	static toPrisma(supplier: SupplierProductModel): SupplierProductRaw {
		if (!supplier) return null as any
		return {
			id: supplier.id,
			supplierId: supplier.supplierId,
			categoryId: supplier.categoryId,
			productId: supplier.productId,
			unitPrice: supplier.unitPrice,
			createdAt: supplier.createdAt,
			createdById: supplier.createdById,
			updatedAt: supplier.updatedAt,
			updatedById: supplier.updatedById
		} as any
	}
}
