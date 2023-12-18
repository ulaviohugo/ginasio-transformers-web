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
	transactionReducer,
	productionSaleReducer,
	salaryReceiptReducer,
	worksStatementReducer
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
		productionSales: productionSaleReducer,
		productionStocks: productionStockReducer,
		productionSuppliers: productionSupplierReducer,
		productSales: productSaleReducer,
		salaryReceipts: salaryReceiptReducer,
		sales: saleReducer,
		stocks: stockReducer,
		suppliers: supplierReducer,
		transactions: transactionReducer,
		workStatements: worksStatementReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
