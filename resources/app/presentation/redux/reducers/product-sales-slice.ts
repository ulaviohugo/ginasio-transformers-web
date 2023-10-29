import { ProductSaleModel } from '@/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ProductSaleState {
	productSales: ProductSaleModel[]
}

const initialState: ProductSaleState = {
	productSales: []
}

export const productSaleSlice = createSlice({
	name: 'productSales',
	initialState,
	reducers: {
		addProductSaleStore: (state, action: PayloadAction<ProductSaleModel>) => {
			state.productSales.unshift(action.payload)
		},
		loadProductSaleStore: (state, action: PayloadAction<ProductSaleModel[]>) => {
			state.productSales = action.payload
		},
		removeProductSaleStore: (state, action: PayloadAction<number>) => {
			state.productSales = state.productSales.filter(
				(productSale) => productSale.id !== action.payload
			)
		},
		updateProductSaleStore: (state, action: PayloadAction<ProductSaleModel>) => {
			state.productSales = state.productSales.map((productSale) => {
				if (productSale.id == action.payload.id) {
					return action.payload
				}
				return productSale
			})
		}
	}
})

export const {
	addProductSaleStore,
	loadProductSaleStore,
	removeProductSaleStore,
	updateProductSaleStore
} = productSaleSlice.actions
export const productSaleReducer = productSaleSlice.reducer
