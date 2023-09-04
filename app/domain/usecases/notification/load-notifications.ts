import { NotificationModel } from '../../models'

export interface LoadNotifications {
	load(): Promise<LoadNotificationsResult>
}

export type LoadNotificationsResult = NotificationModel[]
