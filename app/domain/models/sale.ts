import { PurchaseModel } from '.'

export interface Sale {
	id: number
	purchaseId: number
	quantity: number
	totalValue: number
	unitPrice: number
	discount: number
	paymentMethod: string
	employeeId: number
	createdAt: Date
	createdById?: number
	updatedAt?: Date
	updatedById?: number

	purchase?: PurchaseModel
}
