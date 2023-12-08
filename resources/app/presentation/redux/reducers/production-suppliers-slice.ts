import { ProductionSupplierModel } from '@/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ProductionSupplierState {
	productionSuppliers: ProductionSupplierModel[]
}

const initialState: ProductionSupplierState = {
	productionSuppliers: []
}

export const productionSupplierSlice = createSlice({
	name: 'productionSuppliers',
	initialState,
	reducers: {
		addProductionSupplierStore: (
			state,
			action: PayloadAction<ProductionSupplierModel>
		) => {
			state.productionSuppliers.unshift(action.payload)
		},
		loadProductionSupplierStore: (
			state,
			action: PayloadAction<ProductionSupplierModel[]>
		) => {
			state.productionSuppliers = action.payload
		},
		removeProductionSupplierStore: (state, action: PayloadAction<number>) => {
			state.productionSuppliers = state.productionSuppliers.filter(
				(productionSupplier) => productionSupplier.id !== action.payload
			)
		},
		updateProductionSupplierStore: (
			state,
			action: PayloadAction<ProductionSupplierModel>
		) => {
			state.productionSuppliers = state.productionSuppliers.map((productionSupplier) => {
				if (productionSupplier.id == action.payload.id) {
					return action.payload
				}
				return productionSupplier
			})
		}
	}
})

export const {
	addProductionSupplierStore,
	loadProductionSupplierStore,
	removeProductionSupplierStore,
	updateProductionSupplierStore
} = productionSupplierSlice.actions
export const productionSupplierReducer = productionSupplierSlice.reducer
