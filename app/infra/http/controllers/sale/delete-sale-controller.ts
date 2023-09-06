import { DeleteSale } from '@/domain/usecases'
import { badRequest, notFound, ok, serverError } from '../../helper'
import { Controller, ControllerParams, Validation } from '../../protocols'
import { HttpResponse } from '@/data/protocols/http'
import { UploadService } from '@/services'
import { dbErrorHandler } from '@/infra/db'

export class DeleteSaleController implements Controller {
	constructor(
		private readonly deleteSale: DeleteSale,
		private readonly validation: Validation
	) {}

	async handle({ id }: ControllerParams<Param>): Promise<HttpResponse> {
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

type Param = {
	id: number
}
