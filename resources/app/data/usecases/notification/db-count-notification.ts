import { CountNotification } from '@/domain/usecases'
import { NotificationRepository } from '@/data/protocols'

export class DbCountNotification implements CountNotification {
	constructor(private readonly notificationRepository: NotificationRepository) {}

	async count(): Promise<number> {
		return await this.notificationRepository.count()
	}
}
