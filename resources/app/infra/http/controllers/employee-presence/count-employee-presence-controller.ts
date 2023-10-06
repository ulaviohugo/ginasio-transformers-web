import { CountEmployeePresence } from '@/domain/usecases'
import { Controller } from '@/infra/http/protocols'
import { ok, serverError } from '@/infra/http/helper'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class CountEmployeePresenceController implements Controller {
	constructor(private readonly countEmployeePresence: CountEmployeePresence) {}
	async handle(): Promise<HttpResponse> {
		try {
			const count = await this.countEmployeePresence.count()
			return ok(count)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
