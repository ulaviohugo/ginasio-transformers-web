import { CountPurchase } from '@/app/domain/usecases'
import { Controller } from '../../protocols'
import { ok, serverError } from '../../helper'
import { HttpResponse } from '@/app/data/protocols/http'

export class CountPurchaseController implements Controller {
	constructor(private readonly countPurchase: CountPurchase) {}
	async handle(): Promise<HttpResponse> {
		try {
			const count = await this.countPurchase.count()
			return ok(count)
		} catch (error) {
			return serverError(error)
		}
	}
}
