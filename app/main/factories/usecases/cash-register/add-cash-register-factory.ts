import { DbAddCashRegister } from '@/data/usecases'
import { CashRegisterPrismaRepository } from '@/infra/db'

export const makeAddCashRegister = () => {
	return new DbAddCashRegister(new CashRegisterPrismaRepository())
}
