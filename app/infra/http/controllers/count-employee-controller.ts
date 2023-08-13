import { CountEmployee } from '@/app/domain/usecases'
import { Controller, HttpResponse } from '../protocols'
import { ok, serverError } from '../helper'

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
