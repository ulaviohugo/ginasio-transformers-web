import { configureStore } from '@reduxjs/toolkit'
import {
	categoryReducer,
	employeeReducer,
	locationReducer,
	productReducer
} from './reducers'

export const store = configureStore({
	reducer: {
		employees: employeeReducer,
		locations: locationReducer,
		categories: categoryReducer,
		products: productReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
