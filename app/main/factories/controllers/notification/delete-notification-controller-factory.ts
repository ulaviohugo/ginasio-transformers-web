import { DeleteNotificationController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { NumberGreaterThanValidation } from '@/validation/validators'
import { makeDeleteNotification } from '@/main/factories'

export const makeDeleteNotificationController = (): Controller => {
	return new DeleteNotificationController(
		makeDeleteNotification(),
		new NumberGreaterThanValidation('id', 0)
	)
}
