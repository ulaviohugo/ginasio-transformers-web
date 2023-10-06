import { DbUpdateTransaction } from '@/data/usecases'
import { TransactionPrismaRepository } from '@/infra/db'

export const makeUpdateTransaction = () => {
	return new DbUpdateTransaction(new TransactionPrismaRepository())
}
