import { Transaction as TransactionRaw } from '@prisma/client'

import { TransactionModel } from '@/domain/models'
import { DateUtils, NumberUtils } from '@/utils'

export class PrismaTransactionMapper {
	static toPrisma(transaction: TransactionModel): TransactionRaw {
		if (!transaction) return null as any
		return {
			id: transaction.id,
			description: transaction.description,
			operationType: transaction.operationType,
			amount: NumberUtils.convertToNumber(transaction.amount),
			paymentMethod: transaction.paymentMethod,
			date: DateUtils.convertToDate(transaction.date),
			cashRegisterId: transaction.cashRegisterId,
			postMovementBalance: NumberUtils.convertToNumber(transaction.postMovementBalance),
			createdAt: transaction.createdAt,
			createdById: transaction.createdById,
			updatedAt: DateUtils.convertToDate(transaction.updatedAt),
			updatedById: transaction.updatedById
		} as any
	}
}
