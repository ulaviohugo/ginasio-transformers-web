import { LoadSales } from '@/domain/usecases'
import { ok, serverError } from '@/infra/http/helper'
import { Controller } from '@/infra/http/protocols'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class LoadSaleController implements Controller {
	constructor(private readonly loadSale: LoadSales) {}
	async handle(): Promise<HttpResponse> {
		try {
			const data = await this.loadSale.load()
			return ok(data)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
