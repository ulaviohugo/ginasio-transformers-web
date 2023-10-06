import { DbUpdateInsured } from '@/data/usecases'
import { InsuredPrismaRepository } from '@/infra/db'

export const makeUpdateInsured = () => {
	return new DbUpdateInsured(new InsuredPrismaRepository())
}
