import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface FormSupplierState {
	formSupplier: { open: boolean }
}

const initialState: FormSupplierState = {
	formSupplier: { open: false }
}

export const formSupplierSlice = createSlice({
	name: 'formSupplier',
	initialState,
	reducers: {
		formSupplierOpen: (state, action: PayloadAction<boolean>) => {
			state.formSupplier.open = action.payload
		}
	}
})

export const { formSupplierOpen } = formSupplierSlice.actions
export const formSupplierReducer = formSupplierSlice.reducer
