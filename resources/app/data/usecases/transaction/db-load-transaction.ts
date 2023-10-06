import { LoadTransactions } from '@/domain/usecases'
import { TransactionRepository } from '@/data/protocols'
import { TransactionModel } from '@/domain/models'

export class DbLoadTransactions implements LoadTransactions {
	constructor(private readonly TransactionRepository: TransactionRepository) {}
	async load(): Promise<TransactionModel[]> {
		return this.TransactionRepository.loadAll()
	}
}
