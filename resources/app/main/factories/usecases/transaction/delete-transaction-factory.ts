import { DbDeleteTransaction } from '@/data/usecases'
import { TransactionPrismaRepository } from '@/infra/db'

export const makeDeleteTransaction = () => {
	return new DbDeleteTransaction(new TransactionPrismaRepository())
}
