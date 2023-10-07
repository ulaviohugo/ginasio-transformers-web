import { TransactionModel } from '@/domain/models'

export interface UpdateTransaction {
	update(param: TransactionModel): Promise<TransactionModel>
}
