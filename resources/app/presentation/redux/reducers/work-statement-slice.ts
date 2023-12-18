import { WorkStatementModel } from '@/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface WorkStatementState {
	workStatements: WorkStatementModel[]
}

const initialState: WorkStatementState = {
	workStatements: []
}

export const worksStatementSlice = createSlice({
	name: 'workStatements',
	initialState,
	reducers: {
		addWorkStatementStore: (state, action: PayloadAction<WorkStatementModel>) => {
			state.workStatements.unshift(action.payload)
		},
		loadWorkStatementStore: (state, action: PayloadAction<WorkStatementModel[]>) => {
			state.workStatements = action.payload
		},
		removeWorkStatementStore: (state, action: PayloadAction<number>) => {
			state.workStatements = state.workStatements.filter(
				(worksStatement) => worksStatement.id !== action.payload
			)
		},
		updateWorkStatementStore: (state, action: PayloadAction<WorkStatementModel>) => {
			state.workStatements = state.workStatements.map((worksStatement) => {
				if (worksStatement.id == action.payload.id) {
					return action.payload
				}
				return worksStatement
			})
		}
	}
})

export const {
	addWorkStatementStore,
	loadWorkStatementStore,
	removeWorkStatementStore,
	updateWorkStatementStore
} = worksStatementSlice.actions
export const worksStatementReducer = worksStatementSlice.reducer
