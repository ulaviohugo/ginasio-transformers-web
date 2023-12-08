import { ProductionProductModel } from '@/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ProductionProductState {
	productionProducts: ProductionProductModel[]
}

const initialState: ProductionProductState = {
	productionProducts: []
}

export const productionProductSlice = createSlice({
	name: 'productionProducts',
	initialState,
	reducers: {
		addProductionProductStore: (state, action: PayloadAction<ProductionProductModel>) => {
			state.productionProducts.unshift(action.payload)
		},
		loadProductionProductStore: (
			state,
			action: PayloadAction<ProductionProductModel[]>
		) => {
			state.productionProducts = action.payload
		},
		removeProductionProductStore: (state, action: PayloadAction<number>) => {
			state.productionProducts = state.productionProducts.filter(
				(productionProduct) => productionProduct.id !== action.payload
			)
		},
		updateProductionProductStore: (
			state,
			action: PayloadAction<ProductionProductModel>
		) => {
			state.productionProducts = state.productionProducts.map((productionProduct) => {
				if (productionProduct.id == action.payload.id) {
					return action.payload
				}
				return productionProduct
			})
		}
	}
})

export const {
	addProductionProductStore,
	loadProductionProductStore,
	removeProductionProductStore,
	updateProductionProductStore
} = productionProductSlice.actions
export const productionProductReducer = productionProductSlice.reducer
