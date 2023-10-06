import { DbDeleteInsured } from '@/data/usecases'
import { InsuredPrismaRepository } from '@/infra/db'

export const makeDeleteInsured = () => {
	return new DbDeleteInsured(new InsuredPrismaRepository())
}
