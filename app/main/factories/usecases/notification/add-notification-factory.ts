import { DbAddNotification } from '@/app/data/usecases'
import { NotificationPrismaRepository } from '@/app/infra/db'

export const makeAddNotification = () => {
	return new DbAddNotification(new NotificationPrismaRepository())
}
