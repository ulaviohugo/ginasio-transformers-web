import { TransactionModel } from '.'

export type CashRegisterModel = {
	id: number
	initialBalance: number
	balance: number
	createdById: number
	createdAt: Date
	updatedById: number
	updatedAt: Date

	transactions?: TransactionModel[]
}
