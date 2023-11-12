import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface FormCategoryState {
	formCategory: { open: boolean }
}

const initialState: FormCategoryState = {
	formCategory: { open: false }
}

export const formCategorySlice = createSlice({
	name: 'formCategory',
	initialState,
	reducers: {
		formCategoryOpen: (state, action: PayloadAction<boolean>) => {
			state.formCategory.open = !!action.payload
		}
	}
})

export const { formCategoryOpen } = formCategorySlice.actions
export const formCategoryReducer = formCategorySlice.reducer
