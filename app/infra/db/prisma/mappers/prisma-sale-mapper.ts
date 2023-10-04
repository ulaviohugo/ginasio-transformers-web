import { Sale as SaleRaw } from '@prisma/client'

import { SaleModel } from '@/domain/models'
import { NumberUtils } from '@/utils'

export class PrismaSaleMapper {
	static toPrisma(sale: SaleModel): SaleRaw {
		if (!sale) return null as any
		return {
			id: sale.id,
			purchaseId: sale.purchaseId,
			customerId: NumberUtils.convertToNumber(sale.customerId, true),
			quantity: NumberUtils.convertToNumber(sale.quantity),
			totalValue: NumberUtils.convertToNumber(sale.totalValue),
			unitPrice: NumberUtils.convertToNumber(sale.unitPrice),
			amountPaid: NumberUtils.convertToNumber(sale.amountPaid),
			size: sale.size,
			color: sale.color,
			discount: NumberUtils.convertToNumber(sale.discount),
			paymentMethod: sale.paymentMethod,
			employeeId: NumberUtils.convertToNumber(sale.employeeId),
			createdAt: sale.createdAt,
			createdById: sale.createdById,
			updatedAt: sale.updatedAt,
			updatedById: sale.updatedById
		} as any
	}
}
