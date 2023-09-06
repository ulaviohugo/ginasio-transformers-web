import { DbDeleteCategory } from '@/data/usecases'
import { CategoryPrismaRepository } from '@/infra/db'

export const makeDeleteCategory = () => {
	return new DbDeleteCategory(new CategoryPrismaRepository())
}
