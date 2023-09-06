import { DbLoadNotifications } from '@/data/usecases'
import { NotificationPrismaRepository } from '@/infra/db'

export const makeLoadNotifications = () => {
	return new DbLoadNotifications(new NotificationPrismaRepository())
}
