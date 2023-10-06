import { CountEmployee } from '@/domain/usecases'
import { Controller } from '@/infra/http/protocols'
import { ok, serverError } from '@/infra/http/helper'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class CountEmployeeController implements Controller {
	constructor(private readonly countEmployee: CountEmployee) {}
	async handle(): Promise<HttpResponse> {
		try {
			const count = await this.countEmployee.count()
			return ok(count)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
