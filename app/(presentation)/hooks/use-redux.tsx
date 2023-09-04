import { useSelector } from 'react-redux'
import { RootState } from '../redux'

export const useRedux = () => useSelector((state: RootState) => state)

export const useAuth = () => useRedux().auth.auth
export const useCategories = () => useRedux().categories.categories
export const useCustomers = () => useRedux().customers.customers
export const useEmployees = () => useRedux().employees.employees
export const useLocations = () => useRedux().locations
export const useNotifications = () => useRedux().notifications.notifications
export const useProducts = () => useRedux().products.products
export const usePurchases = () => useRedux().purchases.purchases
export const useSales = () => useRedux().sales.sales
export const useSuppliers = () => useRedux().suppliers.suppliers
