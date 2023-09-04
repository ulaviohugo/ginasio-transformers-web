import { CountNotificationController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { makeCountNotification } from '@/app/main/factories'

export const makeCountNotificationController = (): Controller => {
	return new CountNotificationController(makeCountNotification())
}
