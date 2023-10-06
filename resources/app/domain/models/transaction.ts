import { CashRegisterModel, EmployeeModel } from '.'

export type TransactionModel = {
	id: number
	description: string
	operationType: 'Entrada' | 'Saída'
	amount: number
	paymentMethod: string
	date: Date
	createdById: number
	createdAt: Date
	updatedById: number
	updatedAt: Date
	cashRegisterId: number
	postMovementBalance: number

	cashRegister?: CashRegisterModel
	createdBy?: EmployeeModel
}
