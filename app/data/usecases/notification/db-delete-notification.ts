import { DeleteNotification } from '@/app/domain/usecases'
import { NotificationRepository } from '../../protocols'

export class DbDeleteNotification implements DeleteNotification {
	constructor(private readonly notificationRepository: NotificationRepository) {}

	async delete(notificationId: number): Promise<boolean> {
		const foundNotification = await this.notificationRepository.findById(notificationId)

		if (!foundNotification) return null as any

		return this.notificationRepository.delete(notificationId)
	}
}
