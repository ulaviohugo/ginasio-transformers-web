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
			createdAt: notification.createdAt,
			updatedById: notification.updatedById,
			updatedAt: notification.updatedAt
		} as any
	}

	static toDomain(notificationRaw: Notification): NotificationModel {
		if (!notificationRaw) return null as any
		return {
			id: notificationRaw.id,
			notifiable: notificationRaw.notifiable,
			notifiableId: notificationRaw.notifiableId,
			text: notificationRaw.text,
			createdAt: notificationRaw.createdAt,
			updatedById: notificationRaw.updatedById,
			updatedAt: notificationRaw.updatedAt
		} as any
	}
}
