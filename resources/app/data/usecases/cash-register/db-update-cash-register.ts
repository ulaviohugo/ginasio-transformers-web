import { UpdateCashRegister } from '@/domain/usecases'
import { CashRegisterRepository } from '@/data/protocols'
import { CashRegisterModel } from '@/domain/models'
import { ObjectUtils } from '@/utils'

export class DbUpdateCashRegister implements UpdateCashRegister {
	constructor(private readonly cashRegisterRepository: CashRegisterRepository) {}

	async update(param: CashRegisterModel): Promise<CashRegisterModel> {
		const data = ObjectUtils.trimValues(param)
		return this.cashRegisterRepository.update({
			...data,
			updated_at: new Date()
		})
	}
}
