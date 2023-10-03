import { LoadCashRegister } from '@/domain/usecases'
import { CashRegisterRepository } from '@/data/protocols'
import { CashRegisterModel } from '@/domain/models'

export class DbLoadCashRegister implements LoadCashRegister {
	constructor(private readonly cashRegisterRepository: CashRegisterRepository) {}
	async load(): Promise<CashRegisterModel> {
		return await this.cashRegisterRepository.load()
	}
}
