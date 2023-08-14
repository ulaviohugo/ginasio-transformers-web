import { DbDeleteCategory } from '@/app/data/usecases'
import { CategoryPrismaRepository } from '@/app/infra/db'

export const makeDeleteCategory = () => {
	return new DbDeleteCategory(new CategoryPrismaRepository())
}
