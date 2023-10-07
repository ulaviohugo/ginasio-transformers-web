import { Category as CategoryRaw } from '@prisma/client'

import { CategoryModel } from '@/domain/models'

export class PrismaCategoryMapper {
	static toPrisma(category: CategoryModel): CategoryRaw {
		if (!category) return null as any
		return {
			id: category.id,
			name: category.name,
			user_id: category.user_id,
			created_at: category.created_at,
			user_id_update: category.user_id_update,
			updated_at: category.updated_at
		} as any
	}
}
