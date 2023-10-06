import { EmployeePresenceModel } from '@/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface EmployeePresenceState {
	employeePresences: EmployeePresenceModel[]
}

const initialState: EmployeePresenceState = {
	employeePresences: []
}

export const employeePresenceSlice = createSlice({
	name: 'employeePresences',
	initialState,
	reducers: {
		addEmployeePresenceStore: (state, action: PayloadAction<EmployeePresenceModel>) => {
			state.employeePresences.push(action.payload)
		},
		loadEmployeePresenceStore: (
			state,
			action: PayloadAction<EmployeePresenceModel[]>
		) => {
			state.employeePresences = action.payload
		},
		removeEmployeePresenceStore: (state, action: PayloadAction<number>) => {
			state.employeePresences = state.employeePresences.filter(
				(employeePresence) => employeePresence.id !== action.payload
			)
		},
		updateEmployeePresenceStore: (
			state,
			action: PayloadAction<EmployeePresenceModel>
		) => {
			state.employeePresences = state.employeePresences.map((employeePresence) => {
				if (employeePresence.id == action.payload.id) {
					return action.payload
				}
				return employeePresence
			})
		}
	}
})

export const {
	addEmployeePresenceStore,
	loadEmployeePresenceStore,
	removeEmployeePresenceStore,
	updateEmployeePresenceStore
} = employeePresenceSlice.actions
export const employeePresenceReducer = employeePresenceSlice.reducer
