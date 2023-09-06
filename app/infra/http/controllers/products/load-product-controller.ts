import { LoadProducts } from '@/domain/usecases'
import { ok, serverError } from '../../helper'
import { Controller } from '../../protocols'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class LoadProductController implements Controller {
	constructor(private readonly loadProduct: LoadProducts) {}
	async handle(): Promise<HttpResponse> {
		try {
			const data = await this.loadProduct.load()
			return ok(data)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
