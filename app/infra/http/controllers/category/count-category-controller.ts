import { CountCategory } from '@/app/domain/usecases'
import { Controller } from '../../protocols'
import { ok, serverError } from '../../helper'
import { HttpResponse } from '@/app/data/protocols/http'
import { dbErrorHandler } from '@/app/infra/db'

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
