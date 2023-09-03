import { AddCategory } from '@/app/domain/usecases'
import { UnexpectedError } from '../../errors'
import { badRequest, forbidden, ok, serverError } from '../../helper'
import { Controller, ControllerParams, Validation } from '../../protocols'
import { CategoryModel } from '@/app/domain/models'
import { HttpResponse } from '@/app/data/protocols/http'
import { dbErrorHandler } from '@/app/infra/db'
import { NumberUtils } from '@/app/utils'

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
