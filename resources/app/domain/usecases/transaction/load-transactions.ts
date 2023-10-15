import { QueryParams } from '@/data/protocols'
import { TransactionModel } from '@/domain/models'

export interface LoadTransactions {
	load(queryParams?: QueryParams<TransactionModel>): Promise<TransactionModel[]>
}
