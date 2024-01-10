import { configureStore } from '@reduxjs/toolkit'
import {
	authReducer,
	athleteReducer,
	employeeReducer,
	locationReducer,
	transactionReducer
} from './reducers'

export const store = configureStore({
	reducer: {
		athletes: athleteReducer,
		auth: authReducer,
		employees: employeeReducer,
		locations: locationReducer,
		transactions: transactionReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
