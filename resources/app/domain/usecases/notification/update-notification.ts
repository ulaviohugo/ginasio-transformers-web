import { NotificationModel } from '@/domain/models'

export interface UpdateNotification {
	update(param: NotificationModel): Promise<NotificationModel>
}
