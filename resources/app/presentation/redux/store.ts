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
	formSupplierReducer,
	locationReducer,
	notificationReducer,
	productReducer,
	productSaleReducer,
	productionBudgetReducer,
	productionCategoryReducer,
	productionProductSaleReducer,
	productionProductReducer,
	productionStockReducer,
	productionSupplierReducer,
	stockReducer,
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
		formSupplier: formSupplierReducer,
		insureds: InsuredReducer,
		employees: employeeReducer,
		employeePresences: employeePresenceReducer,
		locations: locationReducer,
		notifications: notificationReducer,
		products: productReducer,
		productionBudgets: productionBudgetReducer,
		productionCategories: productionCategoryReducer,
		productionProductSales: productionProductSaleReducer,
		productionProducts: productionProductReducer,
		productionStocks: productionStockReducer,
		productionSuppliers: productionSupplierReducer,
		productSales: productSaleReducer,
		stocks: stockReducer,
		sales: saleReducer,
		suppliers: supplierReducer,
		transactions: transactionReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
