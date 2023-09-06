import { UpdateNotification } from '@/domain/usecases'
import { NotificationRepository } from '../../protocols'
import { NotificationModel } from '@/domain/models'
import { ObjectUtils } from '@/utils'

export class DbUpdateNotification implements UpdateNotification {
	constructor(private readonly notificationRepository: NotificationRepository) {}

	async update(param: NotificationModel): Promise<NotificationModel> {
		const data = ObjectUtils.trimValues(param)

		const foundById = await this.notificationRepository.findById(data.id)
		if (!foundById) return null as any

		const updatedNotification = await this.notificationRepository.update({
			...data,
			updatedAt: new Date()
		})

		return updatedNotification
	}
}
