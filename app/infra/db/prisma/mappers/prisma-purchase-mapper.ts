import { Purchase as PurchaseRaw } from '@prisma/client'

import { Purchase } from '@/app/domain/models'

export class PrismaPurchaseMapper {
	static toPrisma(purchase: Purchase): PurchaseRaw {
		if (!purchase) return null as any
		return {
			id: purchase.id,
			photo: purchase.photo,
			supplierId: purchase.supplierId,
			categoryId: purchase.categoryId,
			productId: purchase.productId,
			color: purchase.color,
			size: purchase.size,
			unitPrice: purchase.unitPrice,
			quantity: purchase.quantity,
			totalValue: purchase.totalValue,
			sellingPriceUnit: purchase.sellingPriceUnit,
			paymentMethod: purchase.paymentMethod,
			paid: purchase.paid,
			purchaseDate: purchase.purchaseDate,
			dueDate: purchase.dueDate,
			employeeId: purchase.employeeId,
			createdAt: purchase.createdAt,
			createdById: purchase.createdById,
			updatedAt: purchase.updatedAt,
			updatedById: purchase.updatedById
		} as any
	}
}
