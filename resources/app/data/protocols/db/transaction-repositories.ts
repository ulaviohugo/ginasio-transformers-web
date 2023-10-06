import { TransactionModel } from '@/domain/models'

export interface TransactionRepository {
	add(param: TransactionModel): Promise<TransactionModel>
	findById(id: number): Promise<TransactionModel | null>
	loadAll(): Promise<TransactionModel[]>
	update(param: TransactionModel): Promise<TransactionModel>
	delete(id: number): Promise<boolean>
	count(): Promise<number>
}
