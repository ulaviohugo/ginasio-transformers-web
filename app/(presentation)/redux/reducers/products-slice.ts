import { ProductModel } from '@/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ProductState {
	products: ProductModel[]
}

const initialState: ProductState = {
	products: []
}

export const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		addProductStore: (state, action: PayloadAction<ProductModel>) => {
			state.products.push(action.payload)
		},
		loadProductStore: (state, action: PayloadAction<ProductModel[]>) => {
			state.products = action.payload
		},
		removeProductStore: (state, action: PayloadAction<number>) => {
			state.products = state.products.filter((product) => product.id !== action.payload)
		},
		updateProductStore: (state, action: PayloadAction<ProductModel>) => {
			state.products = state.products.map((product) => {
				if (product.id == action.payload.id) {
					return action.payload
				}
				return product
			})
		}
	}
})

export const {
	addProductStore,
	loadProductStore,
	removeProductStore,
	updateProductStore
} = productSlice.actions
export const productReducer = productSlice.reducer
