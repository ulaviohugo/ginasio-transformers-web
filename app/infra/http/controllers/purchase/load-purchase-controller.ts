import { LoadPurchases } from '@/domain/usecases'
import { ok, serverError } from '@/infra/http/helper'
import { Controller } from '@/infra/http/protocols'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class LoadPurchaseController implements Controller {
	constructor(private readonly loadPurchase: LoadPurchases) {}
	async handle(): Promise<HttpResponse> {
		try {
			const data = await this.loadPurchase.load()
			return ok(data)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
