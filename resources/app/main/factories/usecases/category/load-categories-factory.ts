import { DbLoadCategories } from '@/data/usecases'
import { CategoryPrismaRepository } from '@/infra/db'

export const makeLoadCategories = () => {
	return new DbLoadCategories(new CategoryPrismaRepository())
}
