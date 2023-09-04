import { DbUpdateNotification } from '@/app/data/usecases'
import { NotificationPrismaRepository } from '@/app/infra/db'

export const makeUpdateNotification = () => {
	return new DbUpdateNotification(new NotificationPrismaRepository())
}
