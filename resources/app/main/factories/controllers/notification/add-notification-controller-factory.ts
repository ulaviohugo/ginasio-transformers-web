import { Controller } from '@/infra/http/protocols'
import { makeAddNotification } from '@/main/factories'
import { AddNotificationController } from '@/infra/http/controllers'
import { makeAddNotificationValidation } from '.'

export const makeAddNotificationController = (): Controller => {
	return new AddNotificationController(
		makeAddNotification(),
		makeAddNotificationValidation()
	)
}
