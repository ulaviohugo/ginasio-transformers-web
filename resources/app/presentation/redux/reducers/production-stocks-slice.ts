import { ProductionStockModel } from '@/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ProductionStockState {
	productionStocks: ProductionStockModel[]
}

const initialState: ProductionStockState = {
	productionStocks: []
}

export const productionStockSlice = createSlice({
	name: 'productionStocks',
	initialState,
	reducers: {
		addProductionStockStore: (state, action: PayloadAction<ProductionStockModel>) => {
			state.productionStocks.unshift(action.payload)
		},
		loadProductionStockStore: (state, action: PayloadAction<ProductionStockModel[]>) => {
			state.productionStocks = action.payload
		},
		removeProductionStockStore: (state, action: PayloadAction<number>) => {
			state.productionStocks = state.productionStocks.filter(
				(productionStock) => productionStock.id !== action.payload
			)
		},
		updateProductionStockStore: (state, action: PayloadAction<ProductionStockModel>) => {
			state.productionStocks = state.productionStocks.map((productionStock) => {
				if (productionStock.id == action.payload.id) {
					return action.payload
				}
				return productionStock
			})
		}
	}
})

export const {
	addProductionStockStore,
	loadProductionStockStore,
	removeProductionStockStore,
	updateProductionStockStore
} = productionStockSlice.actions

export const productionStockReducer = productionStockSlice.reducer
