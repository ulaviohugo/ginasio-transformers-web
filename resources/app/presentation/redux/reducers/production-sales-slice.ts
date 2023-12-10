import { ProductionSaleModel } from '@/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ProductionSaleState {
	productionSales: ProductionSaleModel[]
}

const initialState: ProductionSaleState = {
	productionSales: []
}

export const productionSaleSlice = createSlice({
	name: 'productionSales',
	initialState,
	reducers: {
		addProductionSaleStore: (state, action: PayloadAction<ProductionSaleModel>) => {
			state.productionSales.unshift(action.payload)
		},
		loadProductionSaleStore: (state, action: PayloadAction<ProductionSaleModel[]>) => {
			state.productionSales = action.payload
		},
		removeProductionSaleStore: (state, action: PayloadAction<number>) => {
			state.productionSales = state.productionSales.filter(
				(productionSale) => productionSale.id !== action.payload
			)
		},
		updateProductionSaleStore: (state, action: PayloadAction<ProductionSaleModel>) => {
			state.productionSales = state.productionSales.map((productionSale) => {
				if (productionSale.id == action.payload.id) {
					return action.payload
				}
				return productionSale
			})
		}
	}
})

export const {
	addProductionSaleStore,
	loadProductionSaleStore,
	removeProductionSaleStore,
	updateProductionSaleStore
} = productionSaleSlice.actions
export const productionSaleReducer = productionSaleSlice.reducer
