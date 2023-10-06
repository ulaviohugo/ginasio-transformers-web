import { InsuredModel } from '@/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface InsuredState {
	insureds: InsuredModel[]
}

const initialState: InsuredState = {
	insureds: []
}

export const InsuredSlice = createSlice({
	name: 'insureds',
	initialState,
	reducers: {
		addInsuredStore: (state, action: PayloadAction<InsuredModel>) => {
			state.insureds.push(action.payload)
		},
		loadInsuredStore: (state, action: PayloadAction<InsuredModel[]>) => {
			state.insureds = action.payload
		},
		removeInsuredStore: (state, action: PayloadAction<number>) => {
			state.insureds = state.insureds.filter((insured) => insured.id !== action.payload)
		},
		updateInsuredStore: (state, action: PayloadAction<InsuredModel>) => {
			state.insureds = state.insureds.map((insured) => {
				if (insured.id == action.payload.id) {
					return action.payload
				}
				return insured
			})
		}
	}
})

export const {
	addInsuredStore,
	loadInsuredStore,
	removeInsuredStore,
	updateInsuredStore
} = InsuredSlice.actions
export const InsuredReducer = InsuredSlice.reducer
