import { LoadEmployees } from '@/app/domain/usecases'
import { ok, serverError } from '../helper'
import { Controller } from '../protocols'
import { HttpResponse } from '@/app/data/protocols/http'

export class LoadEmployeeController implements Controller {
	constructor(private readonly loadEmployee: LoadEmployees) {}
	async handle(): Promise<HttpResponse> {
		try {
			const data = await this.loadEmployee.load()
			return ok(data)
		} catch (error) {
			return serverError(error)
		}
	}
}
