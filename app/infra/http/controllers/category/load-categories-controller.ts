import { LoadCategories } from '@/domain/usecases'
import { ok, serverError } from '@/infra/http/helper'
import { Controller } from '@/infra/http/protocols'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class LoadCategoriesController implements Controller {
	constructor(private readonly addCategory: LoadCategories) {}
	async handle(): Promise<HttpResponse> {
		try {
			const createdCategory = await this.addCategory.load()

			return ok(createdCategory)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
