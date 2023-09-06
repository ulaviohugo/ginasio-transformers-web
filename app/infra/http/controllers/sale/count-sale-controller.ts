import { CountSale } from '@/domain/usecases'
import { Controller } from '../../protocols'
import { ok, serverError } from '../../helper'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class CountSaleController implements Controller {
	constructor(private readonly countSale: CountSale) {}
	async handle(): Promise<HttpResponse> {
		try {
			const count = await this.countSale.count()
			return ok(count)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
