import { TransactionModel } from '@/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface TransactionState {
	transactions: TransactionModel[]
}

const initialState: TransactionState = {
	transactions: []
}

export const transactionSlice = createSlice({
	name: 'transactions',
	initialState,
	reducers: {
		addTransactionStore: (state, action: PayloadAction<TransactionModel>) => {
			state.transactions.unshift(action.payload)
		},
		loadTransactionStore: (state, action: PayloadAction<TransactionModel[]>) => {
			state.transactions = action.payload
		},
		removeTransactionStore: (state, action: PayloadAction<number>) => {
			state.transactions = state.transactions.filter(
				(transaction) => transaction.id !== action.payload
			)
		},
		updateTransactionStore: (state, action: PayloadAction<TransactionModel>) => {
			state.transactions = state.transactions.map((transaction) => {
				if (transaction.id == action.payload.id) {
					return action.payload
				}
				return transaction
			})
		}
	}
})

export const {
	addTransactionStore,
	loadTransactionStore,
	removeTransactionStore,
	updateTransactionStore
} = transactionSlice.actions
export const transactionReducer = transactionSlice.reducer
