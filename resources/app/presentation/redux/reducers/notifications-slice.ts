import { NotificationModel } from '@/domain/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface NotificationState {
	notifications: NotificationModel[]
}

const initialState: NotificationState = {
	notifications: []
}

export const notificationSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {
		addNotificationStore: (state, action: PayloadAction<NotificationModel>) => {
			state.notifications.push(action.payload)
		},
		loadNotificationStore: (state, action: PayloadAction<NotificationModel[]>) => {
			state.notifications = action.payload
		},
		removeNotificationStore: (state, action: PayloadAction<number>) => {
			state.notifications = state.notifications.filter(
				(notification) => notification.id !== action.payload
			)
		},
		updateNotificationStore: (state, action: PayloadAction<NotificationModel>) => {
			state.notifications = state.notifications.map((notification) => {
				if (notification.id == action.payload.id) {
					return action.payload
				}
				return notification
			})
		}
	}
})

export const {
	addNotificationStore,
	loadNotificationStore,
	removeNotificationStore,
	updateNotificationStore
} = notificationSlice.actions
export const notificationReducer = notificationSlice.reducer
