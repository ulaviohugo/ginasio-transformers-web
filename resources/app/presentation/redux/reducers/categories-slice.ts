import { CategoryModel } from '@/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface CategoryState {
	categories: CategoryModel[]
}

const initialState: CategoryState = {
	categories: []
}

export const categorySlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		addCategoryStore: (state, action: PayloadAction<CategoryModel>) => {
			state.categories.unshift(action.payload)
		},
		loadCategoryStore: (state, action: PayloadAction<CategoryModel[]>) => {
			state.categories = action.payload
		},
		removeCategoryStore: (state, action: PayloadAction<number>) => {
			state.categories = state.categories.filter(
				(product) => product.id !== action.payload
			)
		},
		updateCategoryStore: (state, action: PayloadAction<CategoryModel>) => {
			state.categories = state.categories.map((product) => {
				if (product.id == action.payload.id) {
					return action.payload
				}
				return product
			})
		}
	}
})

export const {
	addCategoryStore,
	loadCategoryStore,
	removeCategoryStore,
	updateCategoryStore
} = categorySlice.actions
export const categoryReducer = categorySlice.reducer
