import { DbAddCategory } from '@/data/usecases'
import { CategoryPrismaRepository } from '@/infra/db'

export const makeAddCategory = () => {
	return new DbAddCategory(new CategoryPrismaRepository())
}
