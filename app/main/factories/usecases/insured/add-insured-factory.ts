import { DbAddInsured } from '@/data/usecases'
import { InsuredPrismaRepository } from '@/infra/db'

export const makeAddInsured = () => {
	return new DbAddInsured(new InsuredPrismaRepository())
}
