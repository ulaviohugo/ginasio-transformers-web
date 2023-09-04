import { DbLoadNotifications } from '@/app/data/usecases'
import { NotificationPrismaRepository } from '@/app/infra/db'

export const makeLoadNotifications = () => {
	return new DbLoadNotifications(new NotificationPrismaRepository())
}
