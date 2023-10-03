import { DbLoadCashRegister } from '@/data/usecases'
import { CashRegisterPrismaRepository } from '@/infra/db'

export const makeLoadCashRegister = () => {
	return new DbLoadCashRegister(new CashRegisterPrismaRepository())
}
