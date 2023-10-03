import { TransactionModel } from '@/domain/models'

export interface LoadTransactions {
	load(): Promise<TransactionModel[]>
}
