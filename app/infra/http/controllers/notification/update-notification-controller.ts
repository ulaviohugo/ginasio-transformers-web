import { UpdateNotification } from '@/app/domain/usecases'
import { badRequest, notFound, ok, serverError } from '../../helper'
import { Controller, ControllerParams, Validation } from '../../protocols'
import { NotificationModel } from '@/app/domain/models'
import { NumberUtils } from '@/app/utils'
import { HttpResponse } from '@/app/data/protocols/http'
import { dbErrorHandler } from '@/app/infra/db'

export class UpdateNotificationController implements Controller {
	constructor(
		private readonly UpdateNotification: UpdateNotification,
		private readonly validation: Validation
	) {}
	async handle(request: ControllerParams<NotificationModel>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
			const updatedNotification = await this.UpdateNotification.update({
				...request,
				id: NumberUtils.convertToNumber(request.id),
				updatedById: NumberUtils.convertToNumber(request.accountId)
			})
			if (updatedNotification == null) {
				return notFound()
			}
			return ok(updatedNotification)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
