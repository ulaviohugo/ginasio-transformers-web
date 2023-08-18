import { AddCategory } from '@/app/domain/usecases'
import { UnexpectedError } from '../../errors'
import { badRequest, forbidden, ok, serverError } from '../../helper'
import { Controller, Validation } from '../../protocols'
import { Category } from '@/app/domain/models'
import { HttpResponse } from '@/app/data/protocols/http'
import { dbErrorHandler } from '@/app/infra/db'

export class AddCategoryController implements Controller {
	constructor(
		private readonly addCategory: AddCategory,
		private readonly validation: Validation
	) {}
	async handle(request: AddCategoryControllerRequest): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
			const createdCategory = await this.addCategory.add(request)

			if (createdCategory == null) {
				return forbidden(new UnexpectedError('O nome já está em uso'))
			}
			return ok(createdCategory)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}

export type AddCategoryControllerRequest = Category
