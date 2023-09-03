import { PurchaseModel } from '@/app/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface PurchaseState {
	purchases: PurchaseModel[]
}

const initialState: PurchaseState = {
	purchases: []
}

export const purchaseSlice = createSlice({
	name: 'purchases',
	initialState,
	reducers: {
		addPurchaseStore: (state, action: PayloadAction<PurchaseModel>) => {
			state.purchases.push(action.payload)
		},
		loadPurchaseStore: (state, action: PayloadAction<PurchaseModel[]>) => {
			state.purchases = action.payload
		},
		removePurchaseStore: (state, action: PayloadAction<number>) => {
			state.purchases = state.purchases.filter(
				(purchase) => purchase.id !== action.payload
			)
		},
		updatePurchaseStore: (state, action: PayloadAction<PurchaseModel>) => {
			state.purchases = state.purchases.map((purchase) => {
				if (purchase.id == action.payload.id) {
					return action.payload
				}
				return purchase
			})
		}
	}
})

export const {
	addPurchaseStore,
	loadPurchaseStore,
	removePurchaseStore,
	updatePurchaseStore
} = purchaseSlice.actions
export const purchaseReducer = purchaseSlice.reducer
