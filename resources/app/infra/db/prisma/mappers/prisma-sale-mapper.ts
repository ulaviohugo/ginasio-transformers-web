import { Sale as SaleRaw } from '@prisma/client'

import { SaleModel } from '@/domain/models'
import { NumberUtils } from '@/utils'
import { PrismaProductSaleMapper } from '.'

export class PrismaSaleMapper {
	static toPrisma(sale: SaleModel): SaleRaw {
		if (!sale) return null as any
		return {
			id: sale.id,
			customer_id: NumberUtils.convertToNumber(sale.customer_id, true),
			total_value: NumberUtils.convertToNumber(sale.total_value),
			amount_paid: NumberUtils.convertToNumber(sale.amount_paid),
			discount: NumberUtils.convertToNumber(sale.discount),
			employee_id: NumberUtils.convertToNumber(sale.employee_id, true),
			payment_method: sale.payment_method,
			created_at: sale.created_at,
			user_id: sale.user_id,
			updated_at: sale.updated_at,
			user_id_update: sale.user_id_update,
			productSales: sale.product_sales
				? sale.product_sales.map(PrismaProductSaleMapper.toPrisma)
				: (undefined as any)
		} as any
	}
}
