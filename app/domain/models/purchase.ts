import { Supplier } from '@prisma/client'
import { CategoryModel, EmployeeModel, ProductModel } from '.'

export interface PurchaseModel {
	id: number
	photo?: string
	lot?: string
	barCode?: string
	supplierId: number
	categoryId: number
	productId: number
	color: string
	size: string
	unitPrice: number
	quantity: number
	totalValue: number
	sellingPriceUnit: number
	paymentMethod: string
	paid: boolean
	purchaseDate: Date
	dueDate?: Date
	employeeId: number
	createdAt: Date
	createdById?: number
	updatedAt?: Date
	updatedById?: number

	supplier?: Supplier
	category?: CategoryModel
	product?: ProductModel
	employee?: EmployeeModel
}
