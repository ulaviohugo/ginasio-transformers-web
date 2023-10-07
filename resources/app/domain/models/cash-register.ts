import { TransactionModel } from '.'

export type CashRegisterModel = {
	id: number
	initial_balance: number
	balance: number
	user_id: number
	created_at: Date
	user_id_update: number
	updated_at: Date

	transactions?: TransactionModel[]
}
