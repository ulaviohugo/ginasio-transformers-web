import { CashRegister as CashRegisterRaw } from '@prisma/client'

import { CashRegisterModel } from '@/domain/models'
import { DateUtils, NumberUtils } from '@/utils'

export class PrismaCashRegisterMapper {
	static toPrisma(cashRegister: CashRegisterModel): CashRegisterRaw {
		if (!cashRegister) return null as any
		return {
			id: cashRegister.id,
			balance: NumberUtils.convertToNumber(cashRegister.balance),
			initial_balance: NumberUtils.convertToNumber(cashRegister.initial_balance),
			created_at: cashRegister.created_at,
			user_id: NumberUtils.convertToNumber(cashRegister.user_id, true),
			updated_at: DateUtils.convertToDate(cashRegister.updated_at),
			user_id_update: NumberUtils.convertToNumber(cashRegister.user_id_update, true)
		} as any
	}
}
