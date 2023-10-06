import { LoadEmployeePresences } from '@/domain/usecases'
import { ok, serverError } from '@/infra/http/helper'
import { Controller } from '@/infra/http/protocols'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class LoadEmployeePresenceController implements Controller {
	constructor(private readonly loadEmployeePresence: LoadEmployeePresences) {}
	async handle(): Promise<HttpResponse> {
		try {
			const employees = await this.loadEmployeePresence.load()
			return ok(employees.map((employee) => ({ ...employee, password: undefined })))
		} catch (error: any) {
			return serverError(dbErrorHandler(error))
		}
	}
}
