import { DbLoadCategories } from '@/app/data/usecases'
import { CategoryPrismaRepository } from '@/app/infra/db'

export const makeLoadCategories = () => {
	return new DbLoadCategories(new CategoryPrismaRepository())
}
