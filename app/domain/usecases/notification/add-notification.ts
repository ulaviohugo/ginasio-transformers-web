import { NotificationModel } from '../../models'

export interface AddNotification {
	add(param: NotificationModel): Promise<NotificationModel>
}
