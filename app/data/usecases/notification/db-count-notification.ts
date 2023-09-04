import { CountNotification } from '@/app/domain/usecases'
import { NotificationRepository } from '../../protocols'

export class DbCountNotification implements CountNotification {
	constructor(private readonly notificationRepository: NotificationRepository) {}

	async count(): Promise<number> {
		return await this.notificationRepository.count()
	}
}
