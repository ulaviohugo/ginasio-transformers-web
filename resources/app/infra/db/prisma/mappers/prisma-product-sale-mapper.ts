import { ProductSale as ProductSaleRaw } from '@prisma/client'

import { ProductSaleModel } from '@/domain/models'
import { NumberUtils } from '@/utils'

export class PrismaProductSaleMapper {
	static toPrisma(productSale: ProductSaleModel): ProductSaleRaw {
		if (!productSale) return null as any
		return {
			id: NumberUtils.convertToNumber(productSale.id, true),
			product_id: NumberUtils.convertToNumber(productSale.product_id, true),
			saleId: NumberUtils.convertToNumber(productSale.saleId, true),
			quantity: NumberUtils.convertToNumber(productSale.quantity),
			total_value: NumberUtils.convertToNumber(productSale.total_value),
			unit_price: NumberUtils.convertToNumber(productSale.unit_price),
			amount_paid: NumberUtils.convertToNumber(productSale.amount_paid),
			size: productSale.size,
			color: productSale.color,
			discount: NumberUtils.convertToNumber(productSale.discount),
			employee_id: NumberUtils.convertToNumber(productSale.employee_id, true),
			created_at: productSale.created_at,
			user_id: productSale.user_id,
			updated_at: productSale.updated_at,
			user_id_update: productSale.user_id_update
		} as any
	}
}
