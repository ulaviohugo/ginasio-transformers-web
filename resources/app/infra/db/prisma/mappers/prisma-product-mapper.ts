import { Product as ProductRaw } from '@prisma/client'

import { ProductModel } from '@/domain/models'

export class PrismaProductMapper {
	static toPrisma(product: ProductModel): ProductRaw {
		if (!product) return null as any
		return {
			id: product.id,
			name: product.name,
			bar_code: product.bar_code,
			photo: product.photo,
			category_id: product.category_id,
			price: product.price,
			user_id: product.user_id,
			created_at: product.created_at,
			user_id_update: product.user_id_update,
			updated_at: product.updated_at
		} as any
	}

	static toDomain(productRaw: ProductRaw): ProductModel {
		if (!productRaw) return null as any
		return {
			id: productRaw.id,
			name: productRaw.name,
			bar_code: productRaw.bar_code,
			photo: productRaw.photo,
			category_id: productRaw.category_id,
			category: (productRaw as any)?.category,
			price: productRaw.price,
			user_id: productRaw.user_id,
			created_at: productRaw.created_at,
			user_id_update: productRaw.user_id_update,
			updated_at: productRaw.updated_at
		} as any
	}
}
