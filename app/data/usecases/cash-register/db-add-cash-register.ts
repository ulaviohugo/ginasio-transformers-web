import { AddCashRegister } from '@/domain/usecases'
import { CashRegisterRepository } from '@/data/protocols'
import { CashRegisterModel } from '@/domain/models'
import { ObjectUtils } from '@/utils'

export class DbAddCashRegister implements AddCashRegister {
	constructor(private readonly cashRegisterRepository: CashRegisterRepository) {}
	async add(param: CashRegisterModel): Promise<CashRegisterModel> {
		const data = ObjectUtils.trimValues(param)
		return this.cashRegisterRepository.add(data)
	}
}
