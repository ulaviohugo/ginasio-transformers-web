import { UpdateNotificationController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { makeUpdateNotificationValidation } from '.'
import { makeUpdateNotification } from '@/app/main/factories'

export const makeUpdateNotificationController = (): Controller => {
	return new UpdateNotificationController(
		makeUpdateNotification(),
		makeUpdateNotificationValidation()
	)
}
