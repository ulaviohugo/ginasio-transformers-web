import { UpdateEmployee } from '@/domain/usecases'
import { DocumentInUseError, EmailInUseError } from '@/infra/http/errors'
import { badRequest, forbidden, notFound, ok, serverError } from '@/infra/http/helper'
import { Controller, ControllerParams, Validation } from '@/infra/http/protocols'
import { EmployeeModel } from '@/domain/models'
import { DateUtils, NumberUtils } from '@/utils'
import { HttpResponse } from '@/data/protocols/http'
import { UploadService } from '@/services'
import { Uploader } from '@/data/protocols/services'
import { dbErrorHandler } from '@/infra/db'
import { EmployeeViewModel } from '@/infra/http/view-models'

export class UpdateEmployeeController implements Controller {
	constructor(
		private readonly UpdateEmployee: UpdateEmployee,
		private readonly validation: Validation
	) {}
	async handle(request: ControllerParams<EmployeeModel>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
			const canLogin = request.canLogin === true || (request as any).canLogin == 'true'

			let uploader: Uploader = null as any
			if (request.photo && typeof request.photo != 'string') {
				uploader = new UploadService(request.photo, '/employees')
			}
			const updatedEmployee = await this.UpdateEmployee.update(
				{
					...request,
					id: NumberUtils.convertToNumber(request.id),
					dateOfBirth: DateUtils.convertToDate(request.dateOfBirth),
					countryId: NumberUtils.convertToNumber(request.countryId),
					provinceId: NumberUtils.convertToNumber(request.provinceId, true),
					municipalityId: NumberUtils.convertToNumber(request.municipalityId, true),
					dependents: NumberUtils.convertToNumber(request.dependents),
					baseSalary: NumberUtils.convertToNumber(request.baseSalary),
					canLogin,
					hireDate: DateUtils.convertToDate(request.hireDate),
					contractEndDate: DateUtils.convertToDate(request.contractEndDate),
					updatedById: NumberUtils.convertToNumber(request.accountId)
				},
				uploader
			)
			if (updatedEmployee == 'notFound') {
				return notFound()
			}
			if (updatedEmployee == 'emailInUse') {
				return forbidden(new EmailInUseError())
			}
			if (updatedEmployee == 'documentInUse') {
				return forbidden(new DocumentInUseError())
			}
			return ok(EmployeeViewModel.toHTTP(updatedEmployee))
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
