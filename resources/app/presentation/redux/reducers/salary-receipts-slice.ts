import { SalaryReceiptModel } from '@/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface SalaryReceiptState {
	salaryReceipts: SalaryReceiptModel[]
}

const initialState: SalaryReceiptState = {
	salaryReceipts: []
}

export const salaryReceiptSlice = createSlice({
	name: 'salaryReceipts',
	initialState,
	reducers: {
		addSalaryReceiptStore: (state, action: PayloadAction<SalaryReceiptModel>) => {
			state.salaryReceipts.unshift(action.payload)
		},
		loadSalaryReceiptStore: (state, action: PayloadAction<SalaryReceiptModel[]>) => {
			state.salaryReceipts = action.payload
		},
		removeSalaryReceiptStore: (state, action: PayloadAction<number>) => {
			state.salaryReceipts = state.salaryReceipts.filter(
				(salaryReceipt) => salaryReceipt.id !== action.payload
			)
		},
		updateSalaryReceiptStore: (state, action: PayloadAction<SalaryReceiptModel>) => {
			state.salaryReceipts = state.salaryReceipts.map((salaryReceipt) => {
				if (salaryReceipt.id == action.payload.id) {
					return action.payload
				}
				return salaryReceipt
			})
		}
	}
})

export const {
	addSalaryReceiptStore,
	loadSalaryReceiptStore,
	removeSalaryReceiptStore,
	updateSalaryReceiptStore
} = salaryReceiptSlice.actions
export const salaryReceiptReducer = salaryReceiptSlice.reducer
