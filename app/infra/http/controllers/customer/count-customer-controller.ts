import { CountCustomer } from '@/app/domain/usecases'
import { Controller } from '../../protocols'
import { ok, serverError } from '../../helper'
import { HttpResponse } from '@/app/data/protocols/http'
import { dbErrorHandler } from '@/app/infra/db'

export class CountCustomerController implements Controller {
	constructor(private readonly countCustomer: CountCustomer) {}
	async handle(): Promise<HttpResponse> {
		try {
			const count = await this.countCustomer.count()
			return ok(count)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
