import { DbCountInsured } from '@/data/usecases'
import { InsuredPrismaRepository } from '@/infra/db'

export const makeCountInsured = () => {
	return new DbCountInsured(new InsuredPrismaRepository())
}
