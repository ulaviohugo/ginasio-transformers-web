import { Purchase } from '.'

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
	createdBy?: number
	updatedAt?: Date
	updatedBy?: number

	purchase?: Purchase
}
