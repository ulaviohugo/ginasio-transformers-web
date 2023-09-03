import { EmployeeModel } from '@/app/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface EmployeeState {
	employees: EmployeeModel[]
}

const initialState: EmployeeState = {
	employees: []
}

export const employeeSlice = createSlice({
	name: 'employees',
	initialState,
	reducers: {
		addEmployeeStore: (state, action: PayloadAction<EmployeeModel>) => {
			state.employees.push(action.payload)
		},
		loadEmployeeStore: (state, action: PayloadAction<EmployeeModel[]>) => {
			state.employees = action.payload
		},
		removeEmployeeStore: (state, action: PayloadAction<number>) => {
			state.employees = state.employees.filter(
				(employee) => employee.id !== action.payload
			)
		},
		updateEmployeeStore: (state, action: PayloadAction<EmployeeModel>) => {
			state.employees = state.employees.map((employee) => {
				if (employee.id == action.payload.id) {
					return action.payload
				}
				return employee
			})
		}
	}
})

export const {
	addEmployeeStore,
	loadEmployeeStore,
	removeEmployeeStore,
	updateEmployeeStore
} = employeeSlice.actions
export const employeeReducer = employeeSlice.reducer
