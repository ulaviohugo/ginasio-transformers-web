import { CashRegisterModel } from '@/domain/models'

export interface CashRegisterRepository {
	add(param: CashRegisterModel): Promise<CashRegisterModel>
	load(): Promise<CashRegisterModel>
	update(param: CashRegisterModel): Promise<CashRegisterModel>
}
