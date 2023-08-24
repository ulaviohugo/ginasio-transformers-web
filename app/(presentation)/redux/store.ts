import { configureStore } from '@reduxjs/toolkit'
import {
	authReducer,
	categoryReducer,
	employeeReducer,
	locationReducer,
	productReducer,
	purchaseReducer,
	saleReducer,
	supplierReducer
} from './reducers'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		employees: employeeReducer,
		locations: locationReducer,
		categories: categoryReducer,
		products: productReducer,
		purchases: purchaseReducer,
		sales: saleReducer,
		suppliers: supplierReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
