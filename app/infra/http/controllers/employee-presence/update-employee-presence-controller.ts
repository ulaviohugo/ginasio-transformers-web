import { UpdateEmployeePresence } from '@/domain/usecases'
import { DocumentInUseError, EmailInUseError } from '@/infra/http/errors'
import { badRequest, forbidden, notFound, ok, serverError } from '@/infra/http/helper'
import { Controller, ControllerParams, Validation } from '@/infra/http/protocols'
import { EmployeePresenceModel } from '@/domain/models'
import { DateUtils, NumberUtils } from '@/utils'
import { HttpResponse } from '@/data/protocols/http'
import { UploadService } from '@/services'
import { Uploader } from '@/data/protocols/services'
import { dbErrorHandler } from '@/infra/db'

export class UpdateEmployeePresenceController implements Controller {
	constructor(
		private readonly UpdateEmployeePresence: UpdateEmployeePresence,
		private readonly validation: Validation
	) {}
	async handle(request: ControllerParams<EmployeePresenceModel>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
			const updatedEmployeePresence = await this.UpdateEmployeePresence.update({
				...request,
				id: NumberUtils.convertToNumber(request.id),
				employeeId: NumberUtils.convertToNumber(request.employeeId),
				date: DateUtils.convertToDate(request.date),
				updatedById: NumberUtils.convertToNumber(request.accountId)
			})
			return ok(updatedEmployeePresence)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
