import { AbsenceJustificationModel } from '@/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AbsenceJustificationState {
	absenceJustifications: AbsenceJustificationModel[]
}

const initialState: AbsenceJustificationState = {
	absenceJustifications: []
}

export const absenceJustificationSlice = createSlice({
	name: 'absenceJustifications',
	initialState,
	reducers: {
		addAbsenceJustificationStore: (
			state,
			action: PayloadAction<AbsenceJustificationModel>
		) => {
			state.absenceJustifications.unshift(action.payload)
		},
		loadAbsenceJustificationStore: (
			state,
			action: PayloadAction<AbsenceJustificationModel[]>
		) => {
			state.absenceJustifications = action.payload
		},
		removeAbsenceJustificationStore: (state, action: PayloadAction<number>) => {
			state.absenceJustifications = state.absenceJustifications.filter(
				(absenceJustification) => absenceJustification.id !== action.payload
			)
		},
		updateAbsenceJustificationStore: (
			state,
			action: PayloadAction<AbsenceJustificationModel>
		) => {
			state.absenceJustifications = state.absenceJustifications.map(
				(absenceJustification) => {
					if (absenceJustification.id == action.payload.id) {
						return action.payload
					}
					return absenceJustification
				}
			)
		}
	}
})

export const {
	addAbsenceJustificationStore,
	loadAbsenceJustificationStore,
	removeAbsenceJustificationStore,
	updateAbsenceJustificationStore
} = absenceJustificationSlice.actions
export const absenceJustificationReducer = absenceJustificationSlice.reducer
