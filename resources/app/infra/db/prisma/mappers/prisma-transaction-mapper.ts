import { Transaction as TransactionRaw } from '@prisma/client'

import { TransactionModel } from '@/domain/models'
import { DateUtils, NumberUtils } from '@/utils'

export class PrismaTransactionMapper {
	static toPrisma(transaction: TransactionModel): TransactionRaw {
		if (!transaction) return null as any
		return {
			id: transaction.id,
			description: transaction.description,
			operation_type: transaction.operation_type,
			amount: NumberUtils.convertToNumber(transaction.amount),
			payment_method: transaction.payment_method,
			date: DateUtils.convertToDate(transaction.date),
			cash_register_id: transaction.cash_register_id,
			post_movement_balance: NumberUtils.convertToNumber(
				transaction.post_movement_balance
			),
			created_at: transaction.created_at,
			user_id: transaction.user_id,
			updated_at: DateUtils.convertToDate(transaction.updated_at),
			user_id_update: transaction.user_id_update
		} as any
	}
}
