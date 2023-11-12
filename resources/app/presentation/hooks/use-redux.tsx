import { RootState } from '@/presentation/redux'

export const useAuth = () => (state: RootState) => state.auth.auth
export const useCategories = () => (state: RootState) => state.categories.categories
export const useCustomers = () => (state: RootState) => state.customers.customers
export const useEmployees = () => (state: RootState) => state.employees.employees
export const useEmployeePresences = () => (state: RootState) => {
	return state.employeePresences.employeePresences
}
export const useFormCategory = () => (state: RootState) => state.formCategory.formCategory
export const useFormProduct = () => (state: RootState) => state.formProduct.formProduct
export const useFormSupplier = () => (state: RootState) => state.formSupplier.formSupplier
export const useInsureds = () => (state: RootState) => state.insureds.insureds
export const useLocations = () => (state: RootState) => state.locations
export const useNotifications = () => (state: RootState) => {
	return state.notifications.notifications
}
export const useProducts = () => (state: RootState) => state.products.products
export const useProductSales = () => (state: RootState) => state.productSales.productSales
export const useProductionBudgets = () => (state: RootState) =>
	state.productionBudgets.productionBudgets
export const usePurchases = () => (state: RootState) => state.purchases.purchases
export const useSales = () => (state: RootState) => state.sales.sales
export const useSuppliers = () => (state: RootState) => state.suppliers.suppliers
export const useTransactions = () => (state: RootState) => state.transactions.transactions
