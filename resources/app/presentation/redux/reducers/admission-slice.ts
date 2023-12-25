import { AdmissionModel } from '@/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AdmissionState {
	admissions: AdmissionModel[]
}

const initialState: AdmissionState = {
	admissions: []
}

export const admissionSlice = createSlice({
	name: 'admissions',
	initialState,
	reducers: {
		addAdmissionStore: (state, action: PayloadAction<AdmissionModel>) => {
			state.admissions.unshift(action.payload)
		},
		loadAdmissionStore: (state, action: PayloadAction<AdmissionModel[]>) => {
			state.admissions = action.payload
		},
		removeAdmissionStore: (state, action: PayloadAction<number>) => {
			state.admissions = state.admissions.filter(
				(admission) => admission.id !== action.payload
			)
		},
		updateAdmissionStore: (state, action: PayloadAction<AdmissionModel>) => {
			state.admissions = state.admissions.map((admission) => {
				if (admission.id == action.payload.id) {
					return action.payload
				}
				return admission
			})
		}
	}
})

export const {
	addAdmissionStore,
	loadAdmissionStore,
	removeAdmissionStore,
	updateAdmissionStore
} = admissionSlice.actions
export const admissionReducer = admissionSlice.reducer
