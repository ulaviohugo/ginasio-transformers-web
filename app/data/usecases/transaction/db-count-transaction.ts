import { CountTransaction } from '@/domain/usecases'
import { TransactionRepository } from '@/data/protocols'

export class DbCountTransaction implements CountTransaction {
	constructor(private readonly TransactionRepository: TransactionRepository) {}

	async count(): Promise<number> {
		return await this.TransactionRepository.count()
	}
}
