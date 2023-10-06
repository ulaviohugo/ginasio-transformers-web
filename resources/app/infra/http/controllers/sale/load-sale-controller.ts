import { LoadSales } from '@/domain/usecases'
import { ok, serverError } from '@/infra/http/helper'
import { Controller, ControllerParams } from '@/infra/http/protocols'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'
import { SaleModel } from '@/domain/models'

export class LoadSaleController implements Controller {
	constructor(private readonly loadSale: LoadSales) {}
	async handle(params: ControllerParams<SaleModel>): Promise<HttpResponse> {
		try {
			const data = await this.loadSale.load(params?.queryParams)
			return ok(data)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
