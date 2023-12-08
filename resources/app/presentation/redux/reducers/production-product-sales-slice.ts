import { ProductionProductSaleModel } from '@/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ProductionProductSaleState {
	productionProductSales: ProductionProductSaleModel[]
}

const initialState: ProductionProductSaleState = {
	productionProductSales: []
}

export const productionProductSaleSlice = createSlice({
	name: 'productionProductSales',
	initialState,
	reducers: {
		addProductionProductSaleStore: (
			state,
			action: PayloadAction<ProductionProductSaleModel>
		) => {
			state.productionProductSales.unshift(action.payload)
		},
		loadProductionProductSaleStore: (
			state,
			action: PayloadAction<ProductionProductSaleModel[]>
		) => {
			state.productionProductSales = action.payload
		},
		removeProductionProductSaleStore: (state, action: PayloadAction<number>) => {
			state.productionProductSales = state.productionProductSales.filter(
				(productionProductSale) => productionProductSale.id !== action.payload
			)
		},
		updateProductionProductSaleStore: (
			state,
			action: PayloadAction<ProductionProductSaleModel>
		) => {
			state.productionProductSales = state.productionProductSales.map(
				(productionProductSale) => {
					if (productionProductSale.id == action.payload.id) {
						return action.payload
					}
					return productionProductSale
				}
			)
		}
	}
})

export const {
	addProductionProductSaleStore,
	loadProductionProductSaleStore,
	removeProductionProductSaleStore,
	updateProductionProductSaleStore
} = productionProductSaleSlice.actions
export const productionProductSaleReducer = productionProductSaleSlice.reducer
