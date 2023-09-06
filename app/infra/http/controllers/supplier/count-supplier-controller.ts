import { CountSupplier } from '@/domain/usecases'
import { Controller } from '@/infra/http/protocols'
import { ok, serverError } from '@/infra/http/helper'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class CountSupplierController implements Controller {
	constructor(private readonly countSupplier: CountSupplier) {}
	async handle(): Promise<HttpResponse> {
		try {
			const count = await this.countSupplier.count()
			return ok(count)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
