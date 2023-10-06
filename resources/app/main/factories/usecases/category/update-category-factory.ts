import { DbUpdateCategory } from '@/data/usecases'
import { CategoryPrismaRepository } from '@/infra/db'

export const makeUpdateCategory = () => {
	return new DbUpdateCategory(new CategoryPrismaRepository())
}
