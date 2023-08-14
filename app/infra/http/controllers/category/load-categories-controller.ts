import { LoadCategories } from '@/app/domain/usecases'
import { ok, serverError } from '../../helper'
import { Controller } from '../../protocols'
import { HttpResponse } from '@/app/data/protocols/http'

export class LoadCategoriesController implements Controller {
	constructor(private readonly addCategory: LoadCategories) {}
	async handle(): Promise<HttpResponse> {
		try {
			const createdCategory = await this.addCategory.load()

			return ok(createdCategory)
		} catch (error) {
			return serverError(error)
		}
	}
}
