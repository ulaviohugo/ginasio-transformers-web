import { LoadTransactions } from '@/domain/usecases'
import { ok, serverError } from '@/infra/http/helper'
import { Controller } from '@/infra/http/protocols'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class LoadTransactionsController implements Controller {
	constructor(private readonly loadTransaction: LoadTransactions) {}
	async handle(): Promise<HttpResponse> {
		try {
			const employees = await this.loadTransaction.load()
			return ok(employees)
		} catch (error: any) {
			return serverError(dbErrorHandler(error))
		}
	}
}
