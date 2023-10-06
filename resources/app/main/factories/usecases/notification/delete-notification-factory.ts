import { DbDeleteNotification } from '@/data/usecases'
import { NotificationPrismaRepository } from '@/infra/db'

export const makeDeleteNotification = () => {
	return new DbDeleteNotification(new NotificationPrismaRepository())
}
