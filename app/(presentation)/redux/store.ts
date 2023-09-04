import { configureStore } from '@reduxjs/toolkit'
import {
	authReducer,
	categoryReducer,
	customerReducer,
	employeeReducer,
	locationReducer,
	notificationReducer,
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
		notifications: notificationReducer,
		products: productReducer,
		purchases: purchaseReducer,
		sales: saleReducer,
		suppliers: supplierReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
