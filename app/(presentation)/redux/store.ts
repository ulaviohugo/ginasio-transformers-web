import { configureStore } from '@reduxjs/toolkit'
import { categoryReducer, employeeReducer, locationReducer } from './reducers'

export const store = configureStore({
	reducer: {
		employees: employeeReducer,
		locations: locationReducer,
		categories: categoryReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
