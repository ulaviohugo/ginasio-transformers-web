import { LoadSales } from '@/app/domain/usecases'
import { ok, serverError } from '../../helper'
import { Controller } from '../../protocols'
import { HttpResponse } from '@/app/data/protocols/http'
import { dbErrorHandler } from '@/app/infra/db'

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
