import { DeleteEmployeePresence } from '@/domain/usecases'
import { badRequest, notFound, ok, serverError } from '@/infra/http/helper'
import { Controller, ControllerParams, Validation } from '@/infra/http/protocols'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class DeleteEmployeePresenceController implements Controller {
	constructor(
		private readonly deleteEmployeePresence: DeleteEmployeePresence,
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
			const result = await this.deleteEmployeePresence.delete(Number(id))
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
