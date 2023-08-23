import { UpdateEmployee } from '@/app/domain/usecases'
import { DocumentInUseError, EmailInUseError } from '../../errors'
import { badRequest, forbidden, notFound, ok, serverError } from '../../helper'
import { Controller, ControllerParams, Validation } from '../../protocols'
import { Employee } from '@/app/domain/models'
import { DateUtils, NumberUtils } from '@/app/utils'
import { HttpResponse } from '@/app/data/protocols/http'
import { UploadService } from '@/app/services'
import { Uploader } from '@/app/data/protocols/services'
import { dbErrorHandler } from '@/app/infra/db'

export class UpdateEmployeeController implements Controller {
	constructor(
		private readonly UpdateEmployee: UpdateEmployee,
		private readonly validation: Validation
	) {}
	async handle(request: ControllerParams<Employee>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
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
					canLogin: !!request.canLogin,
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
			return ok(updatedEmployee)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
