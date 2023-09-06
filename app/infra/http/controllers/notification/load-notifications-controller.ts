import { LoadNotifications } from '@/domain/usecases'
import { ok, serverError } from '../../helper'
import { Controller } from '../../protocols'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class LoadNotificationController implements Controller {
	constructor(private readonly loadNotification: LoadNotifications) {}
	async handle(): Promise<HttpResponse> {
		try {
			const data = await this.loadNotification.load()
			return ok(data)
		} catch (error: any) {
			return serverError(dbErrorHandler(error))
		}
	}
}
