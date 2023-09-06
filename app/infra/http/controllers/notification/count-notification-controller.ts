import { CountNotification } from '@/domain/usecases'
import { Controller } from '../../protocols'
import { ok, serverError } from '../../helper'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class CountNotificationController implements Controller {
	constructor(private readonly countNotification: CountNotification) {}
	async handle(): Promise<HttpResponse> {
		try {
			const count = await this.countNotification.count()
			return ok(count)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
