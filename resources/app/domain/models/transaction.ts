import { CashRegisterModel, EmployeeModel } from '.'

export type TransactionModel = {
	id: number
	description: string
	operation_type: 'Entrada' | 'Saída'
	amount: number
	payment_method: string
	date: Date
	user_id: number
	created_at: Date
	user_id_update: number
	updated_at: Date
	cash_register_id: number
	post_movement_balance: number

	cash_register?: CashRegisterModel
	user?: EmployeeModel
}
