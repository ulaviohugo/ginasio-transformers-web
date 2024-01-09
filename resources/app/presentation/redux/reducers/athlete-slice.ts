import { AthleteModel } from '@/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AthleteState {
	athletes: AthleteModel[]
}

const initialState: AthleteState = {
	athletes: []
}

export const athleteSlice = createSlice({
	name: 'athletes',
	initialState,
	reducers: {
		addAthleteStore: (state, action: PayloadAction<AthleteModel>) => {
			state.athletes.unshift(action.payload)
		},
		loadAthleteStore: (state, action: PayloadAction<AthleteModel[]>) => {
			state.athletes = action.payload
		},
		removeAthleteStore: (state, action: PayloadAction<number>) => {
			state.athletes = state.athletes.filter((athlete) => athlete.id !== action.payload)
		},
		updateAthleteStore: (state, action: PayloadAction<AthleteModel>) => {
			state.athletes = state.athletes.map((athlete) => {
				if (athlete.id == action.payload.id) {
					return action.payload
				}
				return athlete
			})
		}
	}
})

export const {
	addAthleteStore,
	loadAthleteStore,
	removeAthleteStore,
	updateAthleteStore
} = athleteSlice.actions
export const athleteReducer = athleteSlice.reducer
