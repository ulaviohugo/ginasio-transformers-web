import { DbLoadInsureds } from '@/data/usecases'
import { InsuredPrismaRepository } from '@/infra/db'

export const makeLoadInsureds = () => {
	return new DbLoadInsureds(new InsuredPrismaRepository())
}
