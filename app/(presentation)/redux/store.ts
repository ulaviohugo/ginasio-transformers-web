import { configureStore } from '@reduxjs/toolkit'
import { employeeReducer, locationReducer } from './reducers'

export const store = configureStore({
	reducer: {
		employees: employeeReducer,
		locations: locationReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
