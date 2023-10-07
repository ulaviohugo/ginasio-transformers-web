import { UpdateCategory } from '@/domain/usecases'
import { UnexpectedError } from '@/infra/http/errors'
import { badRequest, forbidden, notFound, ok, serverError } from '@/infra/http/helper'
import { Controller, ControllerParams, Validation } from '@/infra/http/protocols'
import { CategoryModel } from '@/domain/models'
import { NumberUtils } from '@/utils'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class UpdateCategoryController implements Controller {
	constructor(
		private readonly UpdateCategory: UpdateCategory,
		private readonly validation: Validation
	) {}
	async handle(request: ControllerParams<CategoryModel>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}

			const updatedCategory = await this.UpdateCategory.update({
				...request,
				id: NumberUtils.convertToNumber(request.id),
				user_id_update: NumberUtils.convertToNumber(request.accountId)
			})
			if (updatedCategory == 'notFound') {
				return notFound()
			}
			if (updatedCategory == 'nameInUse') {
				return forbidden(new UnexpectedError('O nome já está em uso'))
			}
			return ok(updatedCategory)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
