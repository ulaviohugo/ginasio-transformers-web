import { configureStore } from '@reduxjs/toolkit'
import {
	InsuredReducer,
	authReducer,
	categoryReducer,
	customerReducer,
	employeePresenceReducer,
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
		employeePresences: employeePresenceReducer,
		locations: locationReducer,
		notifications: notificationReducer,
		products: productReducer,
		purchases: purchaseReducer,
		sales: saleReducer,
		suppliers: supplierReducer,
		insureds: InsuredReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
