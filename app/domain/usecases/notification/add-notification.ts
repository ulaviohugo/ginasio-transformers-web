import { NotificationModel } from '@/domain/models'

export interface AddNotification {
	add(param: NotificationModel): Promise<NotificationModel>
}
