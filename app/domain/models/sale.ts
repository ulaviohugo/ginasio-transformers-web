import { CustomerModel, EmployeeModel, ProductSaleModel } from '.'

export interface SaleModel {
	id: number
	customerId?: number
	totalValue: number
	amountPaid: number
	discount: number
	employeeId?: number
	paymentMethod: string

	createdAt: Date
	createdById?: number
	updatedAt?: Date
	updatedById?: number

	employee?: EmployeeModel
	customer?: CustomerModel
	productSales: ProductSaleModel[]
}
