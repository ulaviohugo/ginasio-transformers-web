import { configureStore } from '@reduxjs/toolkit'
import {
	categoryReducer,
	employeeReducer,
	locationReducer,
	productReducer,
	supplierReducer
} from './reducers'

export const store = configureStore({
	reducer: {
		employees: employeeReducer,
		locations: locationReducer,
		categories: categoryReducer,
		products: productReducer,
		suppliers: supplierReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
