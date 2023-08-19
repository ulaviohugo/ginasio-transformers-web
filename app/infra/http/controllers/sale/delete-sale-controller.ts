import { DeleteSale } from '@/app/domain/usecases'
import { badRequest, notFound, ok, serverError } from '../../helper'
import { Controller, Validation } from '../../protocols'
import { HttpResponse } from '@/app/data/protocols/http'
import { UploadService } from '@/app/services'
import { dbErrorHandler } from '@/app/infra/db'

export class DeleteSaleController implements Controller {
	constructor(
		private readonly deleteSale: DeleteSale,
		private readonly validation: Validation
	) {}

	async handle({ id }: DeleteSaleControllerRequest): Promise<HttpResponse> {
		try {
			const error = this.validation.validate({ id })
			if (error) {
				return badRequest(error)
			}
			const result = await this.deleteSale.delete(Number(id))
			if (result === null) {
				return notFound()
			}
			return ok({ message: 'Registo excluído com sucesso.' })
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}

type DeleteSaleControllerRequest = {
	id: number
}
