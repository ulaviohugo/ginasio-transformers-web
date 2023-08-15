import { Category as CategoryRaw } from '@prisma/client'

import { Category } from '@/app/domain/models'

export class PrismaCategoryMapper {
	static toPrisma(category: Category): CategoryRaw {
		if (!category) return null as any
		return {
			id: category.id,
			name: category.name,
			createdBy: category.createdBy,
			createdAt: category.createdAt,
			updatedBy: category.updatedBy,
			updatedAt: category.updatedAt
		} as any
	}
}
