import { CustomerModel } from '@/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface CustomerState {
	customers: CustomerModel[]
}

const initialState: CustomerState = {
	customers: []
}

export const customerSlice = createSlice({
	name: 'customers',
	initialState,
	reducers: {
		addCustomerStore: (state, action: PayloadAction<CustomerModel>) => {
			state.customers.push(action.payload)
		},
		loadCustomerStore: (state, action: PayloadAction<CustomerModel[]>) => {
			state.customers = action.payload
		},
		removeCustomerStore: (state, action: PayloadAction<number>) => {
			state.customers = state.customers.filter(
				(customer) => customer.id !== action.payload
			)
		},
		updateCustomerStore: (state, action: PayloadAction<CustomerModel>) => {
			state.customers = state.customers.map((customer) => {
				if (customer.id == action.payload.id) {
					return action.payload
				}
				return customer
			})
		}
	}
})

export const {
	addCustomerStore,
	loadCustomerStore,
	removeCustomerStore,
	updateCustomerStore
} = customerSlice.actions
export const customerReducer = customerSlice.reducer
