import { CountTransaction } from '@/domain/usecases'
import { Controller } from '@/infra/http/protocols'
import { ok, serverError } from '@/infra/http/helper'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class CountTransactionController implements Controller {
	constructor(private readonly countTransaction: CountTransaction) {}
	async handle(): Promise<HttpResponse> {
		try {
			const count = await this.countTransaction.count()
			return ok(count)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
