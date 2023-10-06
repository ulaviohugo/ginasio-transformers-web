import { Product as ProductRaw } from '@prisma/client'

import { ProductModel } from '@/domain/models'

export class PrismaProductMapper {
	static toPrisma(product: ProductModel): ProductRaw {
		if (!product) return null as any
		return {
			id: product.id,
			name: product.name,
			barCode: product.barCode,
			photo: product.photo,
			categoryId: product.categoryId,
			price: product.price,
			createdById: product.createdById,
			createdAt: product.createdAt,
			updatedById: product.updatedById,
			updatedAt: product.updatedAt
		} as any
	}

	static toDomain(productRaw: ProductRaw): ProductModel {
		if (!productRaw) return null as any
		return {
			id: productRaw.id,
			name: productRaw.name,
			barCode: productRaw.barCode,
			photo: productRaw.photo,
			categoryId: productRaw.categoryId,
			category: (productRaw as any)?.category,
			price: productRaw.price,
			createdById: productRaw.createdById,
			createdAt: productRaw.createdAt,
			updatedById: productRaw.updatedById,
			updatedAt: productRaw.updatedAt
		} as any
	}
}
