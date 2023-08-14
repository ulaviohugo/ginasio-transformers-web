import { DbAddCategory } from '@/app/data/usecases'
import { CategoryPrismaRepository } from '@/app/infra/db'

export const makeAddCategory = () => {
	return new DbAddCategory(new CategoryPrismaRepository())
}
