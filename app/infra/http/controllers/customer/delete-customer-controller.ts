import { DeleteCustomer } from '@/app/domain/usecases'
import { badRequest, notFound, ok, serverError } from '../../helper'
import { Controller, Validation } from '../../protocols'
import { HttpResponse } from '@/app/data/protocols/http'
import { UploadService } from '@/app/services'
import { dbErrorHandler } from '@/app/infra/db'

export class DeleteCustomerController implements Controller {
	constructor(
		private readonly deleteCustomer: DeleteCustomer,
		private readonly validation: Validation
	) {}

	async handle({ id }: DeleteCustomerControllerRequest): Promise<HttpResponse> {
		try {
			const error = this.validation.validate({ id })
			if (error) {
				return badRequest(error)
			}
			const result = await this.deleteCustomer.delete(Number(id), new UploadService())
			if (result === null) {
				return notFound()
			}
			return ok({ message: 'Registo excluído com sucesso.' })
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}

type DeleteCustomerControllerRequest = {
	id: number
}
