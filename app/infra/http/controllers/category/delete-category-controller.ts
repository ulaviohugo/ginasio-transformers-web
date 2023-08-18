import { DeleteCategory } from '@/app/domain/usecases'
import { badRequest, notFound, ok, serverError } from '../../helper'
import { Controller, Validation } from '../../protocols'
import { HttpResponse } from '@/app/data/protocols/http'
import { dbErrorHandler } from '@/app/infra/db'

export class DeleteCategoryController implements Controller {
	constructor(
		private readonly deleteCategory: DeleteCategory,
		private readonly validation: Validation
	) {}

	async handle({ id }: RequestParams): Promise<HttpResponse> {
		try {
			const error = this.validation.validate({ id })
			if (error) {
				return badRequest(error)
			}
			const result = await this.deleteCategory.delete(Number(id))
			if (result === null) {
				return notFound()
			}
			return ok({ message: 'Registo excluído com sucesso.' })
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}

type RequestParams = {
	id: number
}
