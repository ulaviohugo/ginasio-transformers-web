import { CashRegister as CashRegisterRaw } from '@prisma/client'

import { CashRegisterModel } from '@/domain/models'
import { DateUtils, NumberUtils } from '@/utils'

export class PrismaCashRegisterMapper {
	static toPrisma(cashRegister: CashRegisterModel): CashRegisterRaw {
		if (!cashRegister) return null as any
		return {
			id: cashRegister.id,
			balance: NumberUtils.convertToNumber(cashRegister.balance),
			initialBalance: NumberUtils.convertToNumber(cashRegister.initialBalance),
			createdAt: cashRegister.createdAt,
			createdById: NumberUtils.convertToNumber(cashRegister.createdById, true),
			updatedAt: DateUtils.convertToDate(cashRegister.updatedAt),
			updatedById: NumberUtils.convertToNumber(cashRegister.updatedById, true)
		} as any
	}
}
