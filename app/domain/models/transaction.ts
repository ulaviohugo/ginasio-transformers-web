import { CashRegisterModel, EmployeeModel } from '.'

export type TransactionModel = {
	id: number
	description: string
	operationType: 'Entrada' | 'Saída'
	amount: number
	createdById: number
	createdAt: Date
	updatedById: number
	updatedAt: Date
	cashRegisterId: number

	cashRegister?: CashRegisterModel
	createdBy?: EmployeeModel
}
