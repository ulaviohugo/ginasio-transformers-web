import { DeleteTransaction } from '@/domain/usecases'
import { TransactionRepository } from '@/data/protocols'

export class DbDeleteTransaction implements DeleteTransaction {
	constructor(private readonly TransactionRepository: TransactionRepository) {}

	async delete(TransactionId: number): Promise<boolean> {
		const foundTransaction = await this.TransactionRepository.findById(TransactionId)
		if (!foundTransaction) return null as any
		return this.TransactionRepository.delete(TransactionId)
	}
}
