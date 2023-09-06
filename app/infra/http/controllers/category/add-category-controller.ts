import { AddCategory } from '@/domain/usecases'
import { UnexpectedError } from '@/infra/http/errors'
import { badRequest, forbidden, ok, serverError } from '@/infra/http/helper'
import { Controller, ControllerParams, Validation } from '@/infra/http/protocols'
import { CategoryModel } from '@/domain/models'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'
import { NumberUtils } from '@/utils'

export class AddCategoryController implements Controller {
	constructor(
		private readonly addCategory: AddCategory,
		private readonly validation: Validation
	) {}
	async handle(request: ControllerParams<CategoryModel>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
			const createdCategory = await this.addCategory.add({
				...request,
				createdById: NumberUtils.convertToNumber(request.accountId)
			})

			if (createdCategory == null) {
				return forbidden(new UnexpectedError('O nome já está em uso'))
			}
			return ok(createdCategory)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
