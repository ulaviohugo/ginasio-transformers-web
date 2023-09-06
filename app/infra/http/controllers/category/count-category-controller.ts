import { CountCategory } from '@/domain/usecases'
import { Controller } from '../../protocols'
import { ok, serverError } from '../../helper'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class CountCategoryController implements Controller {
	constructor(private readonly countCategory: CountCategory) {}
	async handle(): Promise<HttpResponse> {
		try {
			const count = await this.countCategory.count()
			return ok(count)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
