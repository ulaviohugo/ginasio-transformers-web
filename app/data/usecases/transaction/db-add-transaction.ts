import { AddTransaction } from '@/domain/usecases'
import { TransactionRepository } from '@/data/protocols'
import { TransactionModel } from '@/domain/models'
import { ObjectUtils } from '@/utils'

export class DbAddTransaction implements AddTransaction {
	constructor(private readonly TransactionRepository: TransactionRepository) {}
	async add(param: TransactionModel): Promise<TransactionModel> {
		const data = ObjectUtils.trimValues(param)

		const createdTransaction = await this.TransactionRepository.add(data)
		return createdTransaction
	}
}
