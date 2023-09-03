import { Category as CategoryRaw } from '@prisma/client'

import { CategoryModel } from '@/app/domain/models'

export class PrismaCategoryMapper {
	static toPrisma(category: CategoryModel): CategoryRaw {
		if (!category) return null as any
		return {
			id: category.id,
			name: category.name,
			createdById: category.createdById,
			createdAt: category.createdAt,
			updatedById: category.updatedById,
			updatedAt: category.updatedAt
		} as any
	}
}
