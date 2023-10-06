import { LoadInsureds } from '@/domain/usecases'
import { ok, serverError } from '@/infra/http/helper'
import { Controller } from '@/infra/http/protocols'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class LoadInsuredsController implements Controller {
	constructor(private readonly loadInsured: LoadInsureds) {}
	async handle(): Promise<HttpResponse> {
		try {
			const employees = await this.loadInsured.load()
			return ok(employees)
		} catch (error: any) {
			return serverError(dbErrorHandler(error))
		}
	}
}
