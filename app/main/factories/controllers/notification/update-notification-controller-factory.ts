import { UpdateNotificationController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeUpdateNotificationValidation } from '.'
import { makeUpdateNotification } from '@/main/factories'

export const makeUpdateNotificationController = (): Controller => {
	return new UpdateNotificationController(
		makeUpdateNotification(),
		makeUpdateNotificationValidation()
	)
}
