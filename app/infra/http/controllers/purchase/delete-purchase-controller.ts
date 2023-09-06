import { DeletePurchase } from '@/app/domain/usecases'
import { badRequest, notFound, ok, serverError } from '../../helper'
import { Controller, ControllerParams, Validation } from '../../protocols'
import { HttpResponse } from '@/app/data/protocols/http'
import { UploadService } from '@/app/services'
import { dbErrorHandler } from '@/app/infra/db'

export class DeletePurchaseController implements Controller {
	constructor(
		private readonly deletePurchase: DeletePurchase,
		private readonly validation: Validation
	) {}

	async handle({ id }: ControllerParams<Param>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate({ id })
			if (error) {
				return badRequest(error)
			}
			const result = await this.deletePurchase.delete(Number(id), new UploadService())
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
