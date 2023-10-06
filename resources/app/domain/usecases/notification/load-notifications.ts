import { NotificationModel } from '@/domain/models'

export interface LoadNotifications {
	load(): Promise<LoadNotificationsResult>
}

export type LoadNotificationsResult = NotificationModel[]
