import { Purchase as PurchaseRaw } from '@prisma/client'

import { PurchaseModel } from '@/domain/models'
import { NumberUtils } from '@/utils'

export class PrismaPurchaseMapper {
	static toPrisma(purchase: PurchaseModel): PurchaseRaw {
		if (!purchase) return null as any
		return {
			id: purchase.id,
			photo: purchase.photo,
			lot: purchase.lot,
			barCode: purchase.barCode,
			supplierId: NumberUtils.convertToNumber(purchase.supplierId, true),
			categoryId: NumberUtils.convertToNumber(purchase.categoryId, true),
			productId: NumberUtils.convertToNumber(purchase.productId, true),
			color: purchase.color,
			size: purchase.size,
			unitPrice: NumberUtils.convertToNumber(purchase.unitPrice, true),
			quantity: NumberUtils.convertToNumber(purchase.quantity, true),
			totalValue: NumberUtils.convertToNumber(purchase.totalValue, true),
			sellingPriceUnit: NumberUtils.convertToNumber(purchase.sellingPriceUnit, true),
			paymentMethod: purchase.paymentMethod,
			paid: purchase.paid,
			purchaseDate: purchase.purchaseDate,
			dueDate: purchase.dueDate,
			employeeId: NumberUtils.convertToNumber(purchase.employeeId, true),
			createdAt: purchase.createdAt,
			createdById: purchase.createdById,
			updatedAt: purchase.updatedAt,
			updatedById: purchase.updatedById
		} as any
	}
}
