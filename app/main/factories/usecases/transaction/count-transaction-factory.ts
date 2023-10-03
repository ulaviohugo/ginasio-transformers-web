import { DbCountTransaction } from '@/data/usecases'
import { TransactionPrismaRepository } from '@/infra/db'

export const makeCountTransaction = () => {
	return new DbCountTransaction(new TransactionPrismaRepository())
}
