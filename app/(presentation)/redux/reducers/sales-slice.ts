import { Sale } from '@/app/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface SaleState {
	sales: Sale[]
}

const initialState: SaleState = {
	sales: []
}

export const saleSlice = createSlice({
	name: 'sales',
	initialState,
	reducers: {
		addSaleStore: (state, action: PayloadAction<Sale>) => {
			state.sales.push(action.payload)
		},
		loadSaleStore: (state, action: PayloadAction<Sale[]>) => {
			state.sales = action.payload
		},
		removeSaleStore: (state, action: PayloadAction<number>) => {
			state.sales = state.sales.filter((sale) => sale.id !== action.payload)
		},
		updateSaleStore: (state, action: PayloadAction<Sale>) => {
			state.sales = state.sales.map((sale) => {
				if (sale.id == action.payload.id) {
					return action.payload
				}
				return sale
			})
		}
	}
})

export const { addSaleStore, loadSaleStore, removeSaleStore, updateSaleStore } =
	saleSlice.actions
export const saleReducer = saleSlice.reducer