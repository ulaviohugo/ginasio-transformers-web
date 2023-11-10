import { configureStore } from '@reduxjs/toolkit'
import {
	InsuredReducer,
	authReducer,
	categoryReducer,
	customerReducer,
	employeePresenceReducer,
	employeeReducer,
	formCategoryReducer,
	formProductReducer,
	locationReducer,
	notificationReducer,
	productReducer,
	productSaleReducer,
	purchaseReducer,
	saleReducer,
	supplierReducer,
	transactionReducer
} from './reducers'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		categories: categoryReducer,
		customers: customerReducer,
		formCategory: formCategoryReducer,
		formProduct: formProductReducer,
		insureds: InsuredReducer,
		employees: employeeReducer,
		employeePresences: employeePresenceReducer,
		locations: locationReducer,
		notifications: notificationReducer,
		products: productReducer,
		productSales: productSaleReducer,
		purchases: purchaseReducer,
		sales: saleReducer,
		suppliers: supplierReducer,
		transactions: transactionReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
