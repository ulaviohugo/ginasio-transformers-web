import { CountSupplier } from '@/app/domain/usecases'
import { Controller } from '../../protocols'
import { ok, serverError } from '../../helper'
import { HttpResponse } from '@/app/data/protocols/http'
import { dbErrorHandler } from '@/app/infra/db'

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
