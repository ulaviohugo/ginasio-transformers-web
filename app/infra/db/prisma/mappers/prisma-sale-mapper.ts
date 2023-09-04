import { Sale as SaleRaw } from '@prisma/client'

import { SaleModel } from '@/app/domain/models'

export class PrismaSaleMapper {
	static toPrisma(sale: SaleModel): SaleRaw {
		if (!sale) return null as any
		return {
			id: sale.id,
			purchaseId: sale.purchaseId,
			customerId: sale.customerId,
			quantity: sale.quantity,
			totalValue: sale.totalValue,
			unitPrice: sale.unitPrice,
			amountPaid: sale.amountPaid,
			discount: sale.discount,
			paymentMethod: sale.paymentMethod,
			employeeId: sale.employeeId,
			createdAt: sale.createdAt,
			createdById: sale.createdById,
			updatedAt: sale.updatedAt,
			updatedById: sale.updatedById
		} as any
	}
}
