import { CashRegisterModel } from '@/domain/models'

export interface UpdateCashRegister {
	update(param: CashRegisterModel): Promise<CashRegisterModel>
}
