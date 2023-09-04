import { LoadNotifications, LoadNotificationsResult } from '@/app/domain/usecases'
import { NotificationRepository } from '../../protocols'

export class DbLoadNotifications implements LoadNotifications {
	constructor(private readonly notificationRepository: NotificationRepository) {}
	async load(): Promise<LoadNotificationsResult> {
		const notifications = await this.notificationRepository.loadAll()
		return notifications
	}
}
