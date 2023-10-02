import { RootState } from '@/(presentation)/redux'

export const useAuth = () => (state: RootState) => state.auth.auth
export const useCategories = () => (state: RootState) => state.categories.categories
export const useCustomers = () => (state: RootState) => state.customers.customers
export const useEmployees = () => (state: RootState) => state.employees.employees
export const useEmployeePresences = () => (state: RootState) =>
	state.employeePresences.employeePresences
export const useLocations = () => (state: RootState) => state.locations
export const useNotifications = () => (state: RootState) =>
	state.notifications.notifications
export const useProducts = () => (state: RootState) => state.products.products
export const usePurchases = () => (state: RootState) => state.purchases.purchases
export const useSales = () => (state: RootState) => state.sales.sales
export const useSuppliers = () => (state: RootState) => state.suppliers.suppliers
