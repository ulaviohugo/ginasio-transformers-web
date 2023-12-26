import { RefundModel } from '@/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface RefundState {
	refunds: RefundModel[]
}

const initialState: RefundState = {
	refunds: []
}

export const refundsSlice = createSlice({
	name: 'refunds',
	initialState,
	reducers: {
		addRefundStore: (state, action: PayloadAction<RefundModel>) => {
			state.refunds.unshift(action.payload)
		},
		loadRefundStore: (state, action: PayloadAction<RefundModel[]>) => {
			state.refunds = action.payload
		},
		removeRefundStore: (state, action: PayloadAction<number>) => {
			state.refunds = state.refunds.filter((refunds) => refunds.id !== action.payload)
		},
		updateRefundStore: (state, action: PayloadAction<RefundModel>) => {
			state.refunds = state.refunds.map((refunds) => {
				if (refunds.id == action.payload.id) {
					return action.payload
				}
				return refunds
			})
		}
	}
})

export const { addRefundStore, loadRefundStore, removeRefundStore, updateRefundStore } =
	refundsSlice.actions
export const refundsReducer = refundsSlice.reducer
