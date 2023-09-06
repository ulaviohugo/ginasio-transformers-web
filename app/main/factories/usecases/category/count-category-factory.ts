import { DbCountCategory } from '@/data/usecases'
import { CategoryPrismaRepository } from '@/infra/db'

export const makeCountCategory = () => {
	return new DbCountCategory(new CategoryPrismaRepository())
}
