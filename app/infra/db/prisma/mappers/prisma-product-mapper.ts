import { Product as ProductRaw } from '@prisma/client'

import { Product } from '@/app/domain/models'

export class PrismaProductMapper {
	static toPrisma(product: Product): ProductRaw {
		if (!product) return null as any
		return {
			id: product.id,
			name: product.name,
			image: product.photo,
			categoryId: product.categoryId,
			price: product.price,
			createdById: product.createdById,
			createdAt: product.createdAt,
			updatedById: product.updatedById,
			updatedAt: product.updatedAt
		} as any
	}

	static toDomain(productRaw: ProductRaw): Product {
		if (!productRaw) return null as any
		return {
			id: productRaw.id,
			name: productRaw.name,
			image: productRaw.photo,
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
