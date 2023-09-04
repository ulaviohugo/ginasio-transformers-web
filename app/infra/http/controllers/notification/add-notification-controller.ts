import { AddNotification } from '@/app/domain/usecases'
import { badRequest, ok, serverError } from '../../helper'
import { Controller, ControllerParams, Validation } from '../../protocols'
import { NotificationModel } from '@/app/domain/models'
import { HttpResponse } from '@/app/data/protocols/http'
import { dbErrorHandler } from '@/app/infra/db'

export class AddNotificationController implements Controller {
	constructor(
		private readonly addNotification: AddNotification,
		private readonly validation: Validation
	) {}
	async handle(request: ControllerParams<NotificationModel>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
			const createdNotification = await this.addNotification.add(request)
			return ok(createdNotification)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
