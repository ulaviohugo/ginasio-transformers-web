import { DeleteEmployee } from '@/domain/usecases'
import { badRequest, notFound, ok, serverError } from '../../helper'
import { Controller, ControllerParams, Validation } from '../../protocols'
import { HttpResponse } from '@/data/protocols/http'
import { UploadService } from '@/services'
import { dbErrorHandler } from '@/infra/db'

export class DeleteEmployeeController implements Controller {
	constructor(
		private readonly deleteEmployee: DeleteEmployee,
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

			const result = await this.deleteEmployee.delete(Number(id), new UploadService())
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
