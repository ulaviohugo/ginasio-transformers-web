import { UpdateTransaction } from '@/domain/usecases'
import { badRequest, notFound, ok, serverError } from '@/infra/http/helper'
import { Controller, ControllerParams, Validation } from '@/infra/http/protocols'
import { TransactionModel } from '@/domain/models'
import { NumberUtils } from '@/utils'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class UpdateTransactionController implements Controller {
	constructor(
		private readonly UpdateTransaction: UpdateTransaction,
		private readonly validation: Validation
	) {}
	async handle(request: ControllerParams<TransactionModel>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
			const updatedTransaction = await this.UpdateTransaction.update({
				...request,
				id: NumberUtils.convertToNumber(request.id),
				updatedById: NumberUtils.convertToNumber(request.accountId)
			})
			if (updatedTransaction == null) {
				return notFound()
			}

			return ok(updatedTransaction)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
