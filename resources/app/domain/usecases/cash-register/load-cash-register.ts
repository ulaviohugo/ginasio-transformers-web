import { CashRegisterModel } from '@/domain/models'

export interface LoadCashRegister {
	load(): Promise<CashRegisterModel>
}
