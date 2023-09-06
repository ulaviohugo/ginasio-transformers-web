import { LoadCategories } from '@/domain/usecases'
import { ok, serverError } from '../../helper'
import { Controller } from '../../protocols'
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
