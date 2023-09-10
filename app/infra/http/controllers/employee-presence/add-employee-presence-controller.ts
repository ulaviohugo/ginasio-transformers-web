import { AddEmployeePresence } from '@/domain/usecases'
import { badRequest, forbidden, ok, serverError } from '@/infra/http/helper'
import { Controller, ControllerParams, Validation } from '@/infra/http/protocols'
import { EmployeePresenceModel } from '@/domain/models'
import { DateUtils, NumberUtils } from '@/utils'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class AddEmployeePresenceController implements Controller {
	constructor(
		private readonly addEmployeePresence: AddEmployeePresence,
		private readonly validation: Validation
	) {}
	async handle(request: ControllerParams<EmployeePresenceModel>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
			const createdEmployeePresence = await this.addEmployeePresence.add({
				...request,
				employeeId: NumberUtils.convertToNumber(request.employeeId),
				date: DateUtils.convertToDate(request.date),
				createdById: NumberUtils.convertToNumber(request.accountId)
			})

			if (!createdEmployeePresence) {
				return forbidden(new Error('O registo já foi inserido'))
			}

			return ok(createdEmployeePresence)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
