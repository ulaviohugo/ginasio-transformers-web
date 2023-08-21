import { Sale as SaleRaw } from '@prisma/client'

import { Sale } from '@/app/domain/models'

export class PrismaSaleMapper {
	static toPrisma(sale: Sale): SaleRaw {
		if (!sale) return null as any
		return {
			id: sale.id,
			purchaseId: sale.purchaseId,
			quantity: sale.quantity,
			totalValue: sale.totalValue,
			unitPrice: sale.unitPrice,
			discount: sale.discount,
			paymentMethod: sale.paymentMethod,
			employeeId: sale.employeeId,
			createdAt: sale.createdAt,
			createdBy: sale.createdBy,
			updatedAt: sale.updatedAt,
			updatedBy: sale.updatedBy
		} as any
	}
}