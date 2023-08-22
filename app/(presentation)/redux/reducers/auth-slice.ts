import { Employee } from '@/app/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AuthState {
	auth: Employee
}

const initialState: AuthState = {
	auth: {} as any
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		addAuthStore: (state, action: PayloadAction<Employee>) => {
			state.auth = action.payload
		},
		removeAuthStore: (state) => {
			state.auth = {} as any
		}
	}
})

export const { addAuthStore, removeAuthStore } = authSlice.actions
export const authReducer = authSlice.reducer
