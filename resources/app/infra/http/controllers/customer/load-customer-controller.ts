import { LoadCustomers } from '@/domain/usecases'
import { ok, serverError } from '@/infra/http/helper'
import { Controller } from '@/infra/http/protocols'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'
import { CustomerViewModel } from '@/infra/http/view-models'

export class LoadCustomerController implements Controller {
	constructor(private readonly loadCustomer: LoadCustomers) {}
	async handle(): Promise<HttpResponse> {
		try {
			const customers = await this.loadCustomer.load()
			return ok(customers.map(CustomerViewModel.toHTTP))
		} catch (error: any) {
			return serverError(dbErrorHandler(error))
		}
	}
}
