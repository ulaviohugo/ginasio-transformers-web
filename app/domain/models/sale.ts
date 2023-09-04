import { PurchaseModel } from '.'

export interface SaleModel {
	id: number
	purchaseId: number
	customerId?: number
	quantity: number
	totalValue: number
	unitPrice: number
	color?: string
	size?: string
	discount: number
	paymentMethod: string
	employeeId: number
	createdAt: Date
	createdById?: number
	updatedAt?: Date
	updatedById?: number

	purchase?: PurchaseModel
}
