import { useSelector } from 'react-redux'
import { RootState } from '../redux'

export const useRedux = () => useSelector((state: RootState) => state)

export const useCategories = () => useRedux().categories.categories
export const useEmployees = () => useRedux().employees.employees
export const useLocations = () => useRedux().locations
export const useProducts = () => useRedux().products
