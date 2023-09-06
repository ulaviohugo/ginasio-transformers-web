import { CountPurchase } from '@/domain/usecases'
import { Controller } from '@/infra/http/protocols'
import { ok, serverError } from '@/infra/http/helper'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class CountPurchaseController implements Controller {
	constructor(private readonly countPurchase: CountPurchase) {}
	async handle(): Promise<HttpResponse> {
		try {
			const count = await this.countPurchase.count()
			return ok(count)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
