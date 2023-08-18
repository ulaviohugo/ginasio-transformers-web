import { LoadPurchases } from '@/app/domain/usecases'
import { ok, serverError } from '../../helper'
import { Controller } from '../../protocols'
import { HttpResponse } from '@/app/data/protocols/http'
import { dbErrorHandler } from '@/app/infra/db'

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
