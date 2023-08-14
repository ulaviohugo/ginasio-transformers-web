import { DbCountCategory } from '@/app/data/usecases'
import { CategoryPrismaRepository } from '@/app/infra/db'

export const makeCountCategory = () => {
	return new DbCountCategory(new CategoryPrismaRepository())
}
