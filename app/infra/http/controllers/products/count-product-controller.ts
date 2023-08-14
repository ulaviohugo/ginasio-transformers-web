import { CountProduct } from '@/app/domain/usecases'
import { Controller } from '../../protocols'
import { ok, serverError } from '../../helper'
import { HttpResponse } from '@/app/data/protocols/http'

export class CountProductController implements Controller {
	constructor(private readonly countProduct: CountProduct) {}
	async handle(): Promise<HttpResponse> {
		try {
			const count = await this.countProduct.count()
			return ok(count)
		} catch (error) {
			return serverError(error)
		}
	}
}
