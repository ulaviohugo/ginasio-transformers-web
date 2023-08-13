import { CountEmployee } from '@/app/domain/usecases'
import { Controller } from '../protocols'
import { ok, serverError } from '../helper'
import { HttpResponse } from '@/app/data/protocols/http'

export class CountEmployeeController implements Controller {
	constructor(private readonly countEmployee: CountEmployee) {}
	async handle(): Promise<HttpResponse> {
		try {
			const count = await this.countEmployee.count()
			return ok(count)
		} catch (error) {
			return serverError(error)
		}
	}
}
