import { ProductionBudgetModel } from '@/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ProductionBudgetState {
	productionBudgets: ProductionBudgetModel[]
}

const initialState: ProductionBudgetState = {
	productionBudgets: []
}

export const productionBudgetSlice = createSlice({
	name: 'productionBudgets',
	initialState,
	reducers: {
		addProductionBudgetStore: (state, action: PayloadAction<ProductionBudgetModel>) => {
			state.productionBudgets.unshift(action.payload)
		},
		loadProductionBudgetStore: (
			state,
			action: PayloadAction<ProductionBudgetModel[]>
		) => {
			state.productionBudgets = action.payload
		},
		removeProductionBudgetStore: (state, action: PayloadAction<number>) => {
			state.productionBudgets = state.productionBudgets.filter(
				(productionBudget) => productionBudget.id !== action.payload
			)
		},
		updateProductionBudgetStore: (
			state,
			action: PayloadAction<ProductionBudgetModel>
		) => {
			state.productionBudgets = state.productionBudgets.map((productionBudget) => {
				if (productionBudget.id == action.payload.id) {
					return action.payload
				}
				return productionBudget
			})
		}
	}
})

export const {
	addProductionBudgetStore,
	loadProductionBudgetStore,
	removeProductionBudgetStore,
	updateProductionBudgetStore
} = productionBudgetSlice.actions
export const productionBudgetReducer = productionBudgetSlice.reducer
