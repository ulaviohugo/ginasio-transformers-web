import { CashRegister as CashRegisterRaw } from '@prisma/client'

import { CashRegisterModel } from '@/domain/models'
import { DateUtils } from '@/utils'

export class PrismaCashRegisterMapper {
	static toPrisma(CashRegister: CashRegisterModel): CashRegisterRaw {
		if (!CashRegister) return null as any
		return {
			id: CashRegister.id,
			balance: CashRegister.balance,
			createdAt: CashRegister.createdAt,
			createdById: CashRegister.createdById,
			updatedAt: DateUtils.convertToDate(CashRegister.updatedAt),
			updatedById: CashRegister.updatedById
		} as any
	}
}
