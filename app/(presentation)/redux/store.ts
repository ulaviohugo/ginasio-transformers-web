import { configureStore } from '@reduxjs/toolkit'
import { employeeReducer } from './reducers'

export const store = configureStore({
	reducer: {
		employees: employeeReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
