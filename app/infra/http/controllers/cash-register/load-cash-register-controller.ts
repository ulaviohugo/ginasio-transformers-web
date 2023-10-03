import { LoadCashRegister } from '@/domain/usecases'
import { ok, serverError } from '@/infra/http/helper'
import { Controller } from '@/infra/http/protocols'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class LoadCashRegisterController implements Controller {
	constructor(private readonly loadCashRegister: LoadCashRegister) {}
	async handle(): Promise<HttpResponse> {
		try {
			const employees = await this.loadCashRegister.load()
			return ok(employees)
		} catch (error: any) {
			return serverError(dbErrorHandler(error))
		}
	}
}
