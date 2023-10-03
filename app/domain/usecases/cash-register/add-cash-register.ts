import { CashRegisterModel } from '@/domain/models'

export interface AddCashRegister {
	add(param: CashRegisterModel): Promise<CashRegisterModel>
}
