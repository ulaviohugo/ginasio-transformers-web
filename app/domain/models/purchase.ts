import { Supplier } from '@prisma/client'
import { Category, Employee, Product } from '.'

export interface Purchase {
	id: number
	photo?: string
	supplierId: number
	categoryId: number
	productId: number
	color: string
	size: string
	unitPrice: number
	quantity: number
	totalValue: number
	paymentMethod: string
	paid: boolean
	purchaseDate: Date
	dueDate: Date
	employeeId: number
	createdAt: Date
	createdBy?: number
	updatedAt?: Date
	updatedBy?: number

	supplier?: Supplier
	category?: Category
	product?: Product
	employee?: Employee
}
