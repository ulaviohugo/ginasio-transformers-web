import { DeleteProduct } from '@/app/domain/usecases'
import { badRequest, notFound, ok, serverError } from '../../helper'
import { Controller, Validation } from '../../protocols'
import { HttpResponse } from '@/app/data/protocols/http'
import { UploadService } from '@/app/services'

export class DeleteProductController implements Controller {
	constructor(
		private readonly deleteProduct: DeleteProduct,
		private readonly validation: Validation
	) {}

	async handle({ id }: DeleteProductControllerRequest): Promise<HttpResponse> {
		try {
			const error = this.validation.validate({ id })
			if (error) {
				return badRequest(error)
			}
			const result = await this.deleteProduct.delete(Number(id), new UploadService())
			if (result === null) {
				return notFound()
			}
			return ok({ message: 'Registo excluído com sucesso.' })
		} catch (error) {
			return serverError(error)
		}
	}
}

type DeleteProductControllerRequest = {
	id: number
}