import { DbCountNotification } from '@/app/data/usecases'
import { NotificationPrismaRepository } from '@/app/infra/db'

export const makeCountNotification = () => {
	return new DbCountNotification(new NotificationPrismaRepository())
}
