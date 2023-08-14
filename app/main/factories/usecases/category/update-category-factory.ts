import { DbUpdateCategory } from '@/app/data/usecases'
import { CategoryPrismaRepository } from '@/app/infra/db'

export const makeUpdateCategory = () => {
	return new DbUpdateCategory(new CategoryPrismaRepository())
}
