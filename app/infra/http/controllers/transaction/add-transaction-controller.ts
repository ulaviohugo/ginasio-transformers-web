import { AddTransaction } from '@/domain/usecases'
import { badRequest, ok, serverError } from '@/infra/http/helper'
import { Controller, ControllerParams, Validation } from '@/infra/http/protocols'
import { TransactionModel } from '@/domain/models'
import { NumberUtils } from '@/utils'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class AddTransactionController implements Controller {
	constructor(
		private readonly addTransaction: AddTransaction,
		private readonly validation: Validation
	) {}
	async handle(request: ControllerParams<TransactionModel>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
			const createdTransaction = await this.addTransaction.add({
				...request,
				createdById: NumberUtils.convertToNumber(request.accountId)
			})
			return ok(createdTransaction)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
