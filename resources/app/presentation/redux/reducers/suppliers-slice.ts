import { SupplierModel } from '@/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface SupplierState {
	suppliers: SupplierModel[]
}

const initialState: SupplierState = {
	suppliers: []
}

export const supplierSlice = createSlice({
	name: 'suppliers',
	initialState,
	reducers: {
		addSupplierStore: (state, action: PayloadAction<SupplierModel>) => {
			state.suppliers.unshift(action.payload)
		},
		loadSupplierStore: (state, action: PayloadAction<SupplierModel[]>) => {
			state.suppliers = action.payload
		},
		removeSupplierStore: (state, action: PayloadAction<number>) => {
			state.suppliers = state.suppliers.filter(
				(supplier) => supplier.id !== action.payload
			)
		},
		updateSupplierStore: (state, action: PayloadAction<SupplierModel>) => {
			state.suppliers = state.suppliers.map((supplier) => {
				if (supplier.id == action.payload.id) {
					return action.payload
				}
				return supplier
			})
		}
	}
})

export const {
	addSupplierStore,
	loadSupplierStore,
	removeSupplierStore,
	updateSupplierStore
} = supplierSlice.actions
export const supplierReducer = supplierSlice.reducer
