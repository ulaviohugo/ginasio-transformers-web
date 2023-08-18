import { LoadEmployees } from '@/app/domain/usecases'
import { ok, serverError } from '../../helper'
import { Controller } from '../../protocols'
import { HttpResponse } from '@/app/data/protocols/http'
import { dbErrorHandler } from '@/app/infra/db'

export class LoadEmployeeController implements Controller {
	constructor(private readonly loadEmployee: LoadEmployees) {}
	async handle(): Promise<HttpResponse> {
		try {
			const data = await this.loadEmployee.load()
			return ok(data)
		} catch (error: any) {
			return serverError(dbErrorHandler(error))
		}
	}
}
