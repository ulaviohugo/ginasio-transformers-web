import { DeleteSupplier } from '@/domain/usecases'
import { badRequest, notFound, ok, serverError } from '@/infra/http/helper'
import { Controller, ControllerParams, Validation } from '@/infra/http/protocols'
import { HttpResponse } from '@/data/protocols/http'
import { UploadService } from '@/services'
import { dbErrorHandler } from '@/infra/db'

export class DeleteSupplierController implements Controller {
	constructor(
		private readonly deleteSupplier: DeleteSupplier,
		private readonly validation: Validation
	) {}

	async handle({ id }: ControllerParams<Param>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate({ id })
			if (error) {
				return badRequest(error)
			}
			const result = await this.deleteSupplier.delete(Number(id), new UploadService())
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
