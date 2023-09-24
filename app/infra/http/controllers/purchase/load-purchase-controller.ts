import { LoadPurchases } from '@/domain/usecases'
import { ok, serverError } from '@/infra/http/helper'
import { Controller, ControllerParams } from '@/infra/http/protocols'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'
import { PurchaseModel } from '@/domain/models'

export class LoadPurchaseController implements Controller {
	constructor(private readonly loadPurchase: LoadPurchases) {}
	async handle(params: ControllerParams<PurchaseModel>): Promise<HttpResponse> {
		try {
			const data = await this.loadPurchase.load(params?.queryParams)
			return ok(data)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
