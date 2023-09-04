import { Controller } from '@/app/infra/http/protocols'
import { makeAddNotification } from '@/app/main/factories'
import { AddNotificationController } from '@/app/infra/http/controllers'
import { makeAddNotificationValidation } from '.'

export const makeAddNotificationController = (): Controller => {
	return new AddNotificationController(
		makeAddNotification(),
		makeAddNotificationValidation()
	)
}
