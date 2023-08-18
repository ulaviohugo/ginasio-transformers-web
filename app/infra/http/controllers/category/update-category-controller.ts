import { UpdateCategory } from '@/app/domain/usecases'
import { UnexpectedError } from '../../errors'
import { badRequest, forbidden, notFound, ok, serverError } from '../../helper'
import { Controller, Validation } from '../../protocols'
import { Category } from '@/app/domain/models'
import { NumberUtils } from '@/app/utils'
import { HttpResponse } from '@/app/data/protocols/http'
import { dbErrorHandler } from '@/app/infra/db'

export class UpdateCategoryController implements Controller {
	constructor(
		private readonly UpdateCategory: UpdateCategory,
		private readonly validation: Validation
	) {}
	async handle(request: Category): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}

			const updatedCategory = await this.UpdateCategory.update({
				...request,
				id: NumberUtils.convertToNumber(request.id)
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
