import { DeleteNotificationController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { NumberGreaterThanValidation } from '@/app/validation/validators'
import { makeDeleteNotification } from '@/app/main/factories'

export const makeDeleteNotificationController = (): Controller => {
	return new DeleteNotificationController(
		makeDeleteNotification(),
		new NumberGreaterThanValidation('id', 0)
	)
}
