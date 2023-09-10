import { LoadProducts } from '@/domain/usecases'
import { ok, serverError } from '@/infra/http/helper'
import { Controller } from '@/infra/http/protocols'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'
import { ProductViewModel } from '@/infra/http/view-models'

export class LoadProductController implements Controller {
	constructor(private readonly loadProduct: LoadProducts) {}
	async handle(): Promise<HttpResponse> {
		try {
			const products = await this.loadProduct.load()
			return ok(products.map(ProductViewModel.toHTTP))
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
