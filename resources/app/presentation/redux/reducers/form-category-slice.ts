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
		formCategoryStore: (state, action: PayloadAction<boolean>) => {
			state.formCategory.open = !!action.payload
		}
	}
})

export const { formCategoryStore } = formCategorySlice.actions
export const formCategoryReducer = formCategorySlice.reducer
