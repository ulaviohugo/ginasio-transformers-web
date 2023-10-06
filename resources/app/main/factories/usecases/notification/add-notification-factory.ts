import { DbAddNotification } from '@/data/usecases'
import { NotificationPrismaRepository } from '@/infra/db'

export const makeAddNotification = () => {
	return new DbAddNotification(new NotificationPrismaRepository())
}
