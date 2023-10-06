import { Uploader } from '@/data/protocols/services'
import { TransactionModel } from '@/domain/models'

export interface UpdateTransaction {
	update(param: TransactionModel, uploader?: Uploader): Promise<TransactionModel>
}
