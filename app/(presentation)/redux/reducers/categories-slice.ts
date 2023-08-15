import { Category } from '@prisma/client'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface CategoryState {
	categories: Category[]
}

const initialState: CategoryState = {
	categories: []
}

export const categorySlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		loadCategoryStore: (state, action: PayloadAction<Category[]>) => {
			state.categories = action.payload
		}
	}
})

export const { loadCategoryStore } = categorySlice.actions
export const categoryReducer = categorySlice.reducer
