import { EmployeeModel } from '@/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AuthState {
	auth: EmployeeModel
}

const initialState: AuthState = {
	auth: {} as any
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		addAuthStore: (state, action: PayloadAction<EmployeeModel>) => {
			state.auth = action.payload
		},
		removeAuthStore: (state) => {
			state.auth = {} as any
		}
	}
})

export const { addAuthStore, removeAuthStore } = authSlice.actions
export const authReducer = authSlice.reducer
