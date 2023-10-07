import { NotificationModel } from '@/domain/models'

export interface NotificationRepository {
	add(param: NotificationModel): Promise<NotificationModel>
	findById(employee_id: number): Promise<NotificationModel | null>
	loadAll(): Promise<NotificationModel[]>
	update(param: NotificationModel): Promise<NotificationModel>
	delete(employee_id: number): Promise<boolean>
	count(): Promise<number>
}
