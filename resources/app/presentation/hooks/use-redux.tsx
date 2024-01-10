import { RootState } from '@/presentation/redux'

export const useAthletes = () => (state: RootState) => state.athletes.athletes
export const useAuth = () => (state: RootState) => state.auth.auth
export const useEmployees = () => (state: RootState) => state.employees.employees
export const useLocations = () => (state: RootState) => state.locations
export const useTransactions = () => (state: RootState) => state.transactions.transactions
