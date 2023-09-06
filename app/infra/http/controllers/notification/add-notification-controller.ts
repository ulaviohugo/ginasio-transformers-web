import { AddNotification } from '@/domain/usecases'
import { badRequest, ok, serverError } from '../../helper'
import { Controller, ControllerParams, Validation } from '../../protocols'
import { NotificationModel } from '@/domain/models'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

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
