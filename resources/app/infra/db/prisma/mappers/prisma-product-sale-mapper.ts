import { ProductSale as ProductSaleRaw } from '@prisma/client'

import { ProductSaleModel } from '@/domain/models'
import { NumberUtils } from '@/utils'

export class PrismaProductSaleMapper {
	static toPrisma(productSale: ProductSaleModel): ProductSaleRaw {
		if (!productSale) return null as any
		return {
			id: NumberUtils.convertToNumber(productSale.id, true),
			productId: NumberUtils.convertToNumber(productSale.productId, true),
			saleId: NumberUtils.convertToNumber(productSale.saleId, true),
			quantity: NumberUtils.convertToNumber(productSale.quantity),
			totalValue: NumberUtils.convertToNumber(productSale.totalValue),
			unitPrice: NumberUtils.convertToNumber(productSale.unitPrice),
			amountPaid: NumberUtils.convertToNumber(productSale.amountPaid),
			size: productSale.size,
			color: productSale.color,
			discount: NumberUtils.convertToNumber(productSale.discount),
			employeeId: NumberUtils.convertToNumber(productSale.employeeId, true),
			createdAt: productSale.createdAt,
			createdById: productSale.createdById,
			updatedAt: productSale.updatedAt,
			updatedById: productSale.updatedById
		} as any
	}
}
