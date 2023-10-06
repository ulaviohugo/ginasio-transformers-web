import { DbLoadTransactions } from '@/data/usecases'
import { TransactionPrismaRepository } from '@/infra/db'

export const makeLoadTransactions = () => {
	return new DbLoadTransactions(new TransactionPrismaRepository())
}
