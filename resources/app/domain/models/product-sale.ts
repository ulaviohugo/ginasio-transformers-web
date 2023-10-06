import { ProductModel, SaleModel } from '.'

export type ProductSaleModel = {
	id: number
	productId: number
	saleId: number
	quantity: number
	totalValue: number
	unitPrice: number
	amountPaid: number
	color?: string
	size?: string
	discount: number
	employeeId: number
	createdAt: Date
	createdById?: number
	updatedAt?: Date
	updatedById?: number

	product: ProductModel
	sale: SaleModel
}
