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
		formProductOpen: (state, action: PayloadAction<boolean>) => {
			state.formProduct.open = action.payload
		}
	}
})

export const { formProductOpen } = formProductSlice.actions
export const formProductReducer = formProductSlice.reducer
