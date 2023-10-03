import { DeleteTransaction } from '@/domain/usecases'
import { badRequest, notFound, ok, serverError } from '@/infra/http/helper'
import { Controller, ControllerParams, Validation } from '@/infra/http/protocols'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class DeleteTransactionController implements Controller {
	constructor(
		private readonly deleteTransaction: DeleteTransaction,
		private readonly validation: Validation
	) {}

	async handle({ id }: ControllerParams<Params>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate({ id })
			if (error) {
				return badRequest(error)
			}
			const result = await this.deleteTransaction.delete(Number(id))
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
