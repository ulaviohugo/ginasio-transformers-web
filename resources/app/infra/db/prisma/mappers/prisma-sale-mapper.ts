import { Sale as SaleRaw } from '@prisma/client'

import { SaleModel } from '@/domain/models'
import { NumberUtils } from '@/utils'
import { PrismaProductSaleMapper } from '.'

export class PrismaSaleMapper {
	static toPrisma(sale: SaleModel): SaleRaw {
		if (!sale) return null as any
		return {
			id: sale.id,
			customerId: NumberUtils.convertToNumber(sale.customerId, true),
			totalValue: NumberUtils.convertToNumber(sale.totalValue),
			amountPaid: NumberUtils.convertToNumber(sale.amountPaid),
			discount: NumberUtils.convertToNumber(sale.discount),
			employeeId: NumberUtils.convertToNumber(sale.employeeId, true),
			paymentMethod: sale.paymentMethod,
			createdAt: sale.createdAt,
			createdById: sale.createdById,
			updatedAt: sale.updatedAt,
			updatedById: sale.updatedById,
			productSales: sale.productSales
				? sale.productSales.map(PrismaProductSaleMapper.toPrisma)
				: (undefined as any)
		} as any
	}
}
