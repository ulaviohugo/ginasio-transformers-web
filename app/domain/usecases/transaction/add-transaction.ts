import { TransactionModel } from '@/domain/models'

export interface AddTransaction {
	add(param: TransactionModel): Promise<TransactionModel>
}
