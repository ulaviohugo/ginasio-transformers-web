import { Product as ProductRaw } from '@prisma/client'

import { Product } from '@/app/domain/models'

export class PrismaProductMapper {
	static toPrisma(product: Product): ProductRaw {
		if (!product) return null as any
		return {
			id: product.id,
			name: product.name,
			image: product.image,
			categoryId: product.categoryId,
			price: product.price,
			createdBy: product.createdBy,
			createdAt: product.createdAt,
			updatedBy: product.updatedBy,
			updatedAt: product.updatedAt
		} as any
	}

	static toDomain(productRaw: ProductRaw): Product {
		if (!productRaw) return null as any
		return {
			id: productRaw.id,
			name: productRaw.name,
			image: productRaw.image,
			categoryId: productRaw.categoryId,
			category: (productRaw as any)?.category,
			price: productRaw.price,
			createdBy: productRaw.createdBy,
			createdAt: productRaw.createdAt,
			updatedBy: productRaw.updatedBy,
			updatedAt: productRaw.updatedAt
		} as any
	}
}
