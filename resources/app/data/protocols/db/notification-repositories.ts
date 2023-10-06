import { NotificationModel } from '@/domain/models'

export interface NotificationRepository {
	add(param: NotificationModel): Promise<NotificationModel>
	findById(employeeId: number): Promise<NotificationModel | null>
	loadAll(): Promise<NotificationModel[]>
	update(param: NotificationModel): Promise<NotificationModel>
	delete(employeeId: number): Promise<boolean>
	count(): Promise<number>
}
