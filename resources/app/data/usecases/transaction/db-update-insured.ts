import { UpdateTransaction } from '@/domain/usecases'
import { TransactionRepository } from '@/data/protocols'
import { TransactionModel } from '@/domain/models'
import { ObjectUtils } from '@/utils'

export class DbUpdateTransaction implements UpdateTransaction {
	constructor(private readonly TransactionRepository: TransactionRepository) {}

	async update(param: TransactionModel): Promise<TransactionModel> {
		const data = ObjectUtils.trimValues(param)

		const foundById = await this.TransactionRepository.findById(data.id)
		if (!foundById) return null as any

		const updatedTransaction = await this.TransactionRepository.update({
			...data,
			updated_at: new Date()
		})
		return updatedTransaction
	}
}
