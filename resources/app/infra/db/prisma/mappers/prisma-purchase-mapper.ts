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
			bar_code: purchase.bar_code,
			supplier_id: NumberUtils.convertToNumber(purchase.supplier_id, true),
			category_id: NumberUtils.convertToNumber(purchase.category_id, true),
			product_id: NumberUtils.convertToNumber(purchase.product_id, true),
			color: purchase.color,
			size: purchase.size,
			unit_price: NumberUtils.convertToNumber(purchase.unit_price, true),
			quantity: NumberUtils.convertToNumber(purchase.quantity, true),
			total_value: NumberUtils.convertToNumber(purchase.total_value, true),
			selling_price_unit: NumberUtils.convertToNumber(purchase.selling_price_unit, true),
			payment_method: purchase.payment_method,
			paid: purchase.paid,
			purchase_date: purchase.purchase_date,
			due_date: purchase.due_date,
			employee_id: NumberUtils.convertToNumber(purchase.employee_id, true),
			created_at: purchase.created_at,
			user_id: purchase.user_id,
			updated_at: purchase.updated_at,
			user_id_update: purchase.user_id_update
		} as any
	}
}
