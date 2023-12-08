import { ProductionCategoryModel } from '@/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ProductionCategoryState {
	productionCategories: ProductionCategoryModel[]
}

const initialState: ProductionCategoryState = {
	productionCategories: []
}

export const productionCategorySlice = createSlice({
	name: 'productionCategories',
	initialState,
	reducers: {
		addProductionCategoryStore: (
			state,
			action: PayloadAction<ProductionCategoryModel>
		) => {
			state.productionCategories.unshift(action.payload)
		},
		loadProductionCategoryStore: (
			state,
			action: PayloadAction<ProductionCategoryModel[]>
		) => {
			state.productionCategories = action.payload
		},
		removeProductionCategoryStore: (state, action: PayloadAction<number>) => {
			state.productionCategories = state.productionCategories.filter(
				(product) => product.id !== action.payload
			)
		},
		updateProductionCategoryStore: (
			state,
			action: PayloadAction<ProductionCategoryModel>
		) => {
			state.productionCategories = state.productionCategories.map((product) => {
				if (product.id == action.payload.id) {
					return action.payload
				}
				return product
			})
		}
	}
})

export const {
	addProductionCategoryStore,
	loadProductionCategoryStore,
	removeProductionCategoryStore,
	updateProductionCategoryStore
} = productionCategorySlice.actions
export const productionCategoryReducer = productionCategorySlice.reducer
