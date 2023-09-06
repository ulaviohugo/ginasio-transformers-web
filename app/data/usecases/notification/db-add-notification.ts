import { AddNotification } from '@/domain/usecases'
import { NotificationRepository } from '../../protocols'
import { NotificationModel } from '@/domain/models'
import { ObjectUtils } from '@/utils'

export class DbAddNotification implements AddNotification {
	constructor(private readonly notificationRepository: NotificationRepository) {}
	async add(param: NotificationModel): Promise<NotificationModel> {
		const data = ObjectUtils.trimValues(param)

		const createdNotification = await this.notificationRepository.add(data)

		return createdNotification
	}
}
