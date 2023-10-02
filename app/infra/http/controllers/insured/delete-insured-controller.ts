import { DeleteInsured } from '@/domain/usecases'
import { badRequest, notFound, ok, serverError } from '@/infra/http/helper'
import { Controller, ControllerParams, Validation } from '@/infra/http/protocols'
import { HttpResponse } from '@/data/protocols/http'
import { UploadService } from '@/services'
import { dbErrorHandler } from '@/infra/db'

export class DeleteInsuredController implements Controller {
	constructor(
		private readonly deleteInsured: DeleteInsured,
		private readonly validation: Validation
	) {}

	async handle({ id, accountId }: ControllerParams<Params>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate({ id })
			if (error) {
				return badRequest(error)
			}
			if (id == accountId) {
				return badRequest(new Error('Não pode excluir a própria conta.'))
			}

			const result = await this.deleteInsured.delete(Number(id), new UploadService())
			if (result === null) {
				return notFound()
			}
			return ok({ message: 'Registo excluído com sucesso.' })
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}

type Params = {
	id: number
}
