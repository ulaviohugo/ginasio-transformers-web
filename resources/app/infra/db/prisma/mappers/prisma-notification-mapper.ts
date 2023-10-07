import { Notification } from '@prisma/client'

import { NotificationModel } from '@/domain/models'

export class PrismaNotificationMapper {
	static toPrisma(notification: NotificationModel): Notification {
		if (!notification) return null as any
		return {
			id: notification.id,
			notifiable: notification.notifiable,
			notifiableId: notification.notifiableId,
			text: notification.text,
			created_at: notification.created_at,
			user_id_update: notification.user_id_update,
			updated_at: notification.updated_at
		} as any
	}

	static toDomain(notificationRaw: Notification): NotificationModel {
		if (!notificationRaw) return null as any
		return {
			id: notificationRaw.id,
			notifiable: notificationRaw.notifiable,
			notifiableId: notificationRaw.notifiableId,
			text: notificationRaw.text,
			created_at: notificationRaw.created_at,
			user_id_update: notificationRaw.user_id_update,
			updated_at: notificationRaw.updated_at
		} as any
	}
}
