import { Employee } from '@/app/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface EmployeeState {
	employees: Employee[]
}

const initialState: EmployeeState = {
	employees: []
}

export const employeeSlice = createSlice({
	name: 'employees',
	initialState,
	reducers: {
		addEmployeeStore: (state, action: PayloadAction<Employee>) => {
			state.employees.push(action.payload)
		},
		loadEmployeeStore: (state, action: PayloadAction<Employee[]>) => {
			state.employees = action.payload
		},
		removeEmployeeStore: (state, action: PayloadAction<number>) => {
			state.employees = state.employees.filter(
				(employee) => employee.id !== action.payload
			)
		},
		updateEmployeeStore: (state, action: PayloadAction<Employee>) => {
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
