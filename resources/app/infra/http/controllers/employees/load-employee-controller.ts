import { LoadEmployees } from '@/domain/usecases'
import { ok, serverError } from '@/infra/http/helper'
import { Controller } from '@/infra/http/protocols'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'
import { EmployeeViewModel } from '@/infra/http/view-models'

export class LoadEmployeeController implements Controller {
	constructor(private readonly loadEmployee: LoadEmployees) {}
	async handle(): Promise<HttpResponse> {
		try {
			const employees = await this.loadEmployee.load()
			return ok(employees.map(EmployeeViewModel.toHTTP))
		} catch (error: any) {
			return serverError(dbErrorHandler(error))
		}
	}
}
