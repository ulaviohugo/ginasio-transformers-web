import { configureStore } from '@reduxjs/toolkit'
import {
	authReducer,
	categoryReducer,
	customerReducer,
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
		categories: categoryReducer,
		customers: customerReducer,
		employees: employeeReducer,
		locations: locationReducer,
		products: productReducer,
		purchases: purchaseReducer,
		sales: saleReducer,
		suppliers: supplierReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
