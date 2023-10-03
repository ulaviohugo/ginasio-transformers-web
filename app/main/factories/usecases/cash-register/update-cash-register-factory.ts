import { DbUpdateCashRegister } from '@/data/usecases'
import { CashRegisterPrismaRepository } from '@/infra/db'

export const makeUpdateCashRegister = () => {
	return new DbUpdateCashRegister(new CashRegisterPrismaRepository())
}
