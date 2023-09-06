import { CountNotificationController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeCountNotification } from '@/main/factories'

export const makeCountNotificationController = (): Controller => {
	return new CountNotificationController(makeCountNotification())
}
