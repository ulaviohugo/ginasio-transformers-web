import { DbAddTransaction } from '@/data/usecases'
import { TransactionPrismaRepository } from '@/infra/db'

export const makeAddTransaction = () => {
	return new DbAddTransaction(new TransactionPrismaRepository())
}
