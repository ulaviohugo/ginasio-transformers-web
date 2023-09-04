import { DbDeleteNotification } from '@/app/data/usecases'
import { NotificationPrismaRepository } from '@/app/infra/db'

export const makeDeleteNotification = () => {
	return new DbDeleteNotification(new NotificationPrismaRepository())
}
