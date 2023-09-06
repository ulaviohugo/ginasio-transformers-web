import { DbUpdateNotification } from '@/data/usecases'
import { NotificationPrismaRepository } from '@/infra/db'

export const makeUpdateNotification = () => {
	return new DbUpdateNotification(new NotificationPrismaRepository())
}
