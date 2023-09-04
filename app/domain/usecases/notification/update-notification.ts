import { NotificationModel } from '../../models'

export interface UpdateNotification {
	update(param: NotificationModel): Promise<NotificationModel>
}
