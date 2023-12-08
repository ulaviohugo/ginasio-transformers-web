import { StockModel } from '@/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface StockState {
	stocks: StockModel[]
}

const initialState: StockState = {
	stocks: []
}

export const stockSlice = createSlice({
	name: 'stocks',
	initialState,
	reducers: {
		addStockStore: (state, action: PayloadAction<StockModel>) => {
			state.stocks.unshift(action.payload)
		},
		loadStockStore: (state, action: PayloadAction<StockModel[]>) => {
			state.stocks = action.payload
		},
		removeStockStore: (state, action: PayloadAction<number>) => {
			state.stocks = state.stocks.filter((stock) => stock.id !== action.payload)
		},
		updateStockStore: (state, action: PayloadAction<StockModel>) => {
			state.stocks = state.stocks.map((stock) => {
				if (stock.id == action.payload.id) {
					return action.payload
				}
				return stock
			})
		}
	}
})

export const { addStockStore, loadStockStore, removeStockStore, updateStockStore } =
	stockSlice.actions
export const stockReducer = stockSlice.reducer
