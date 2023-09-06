import { DbCountNotification } from '@/data/usecases'
import { NotificationPrismaRepository } from '@/infra/db'

export const makeCountNotification = () => {
	return new DbCountNotification(new NotificationPrismaRepository())
}
