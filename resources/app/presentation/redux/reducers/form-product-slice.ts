import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface FormProductState {
	formProduct: { open: boolean }
}

const initialState: FormProductState = {
	formProduct: { open: false }
}

export const formProductSlice = createSlice({
	name: 'formProduct',
	initialState,
	reducers: {
		formProductStore: (state, action: PayloadAction<boolean>) => {
			state.formProduct.open = action.payload
		}
	}
})

export const { formProductStore } = formProductSlice.actions
export const formProductReducer = formProductSlice.reducer
