import { AddEmployee } from '@/app/domain/usecases'
import { DocumentInUseError, EmailInUseError } from '../../errors'
import { badRequest, forbidden, ok, serverError } from '../../helper'
import { Controller, ControllerParams, Validation } from '../../protocols'
import { EmployeeModel } from '@/app/domain/models'
import { DateUtils, NumberUtils } from '@/app/utils'
import { UploadService } from '@/app/services'
import { HttpResponse } from '@/app/data/protocols/http'
import { Uploader } from '@/app/data/protocols/services'
import { dbErrorHandler } from '@/app/infra/db'

export class AddEmployeeController implements Controller {
	constructor(
		private readonly addEmployee: AddEmployee,
		private readonly validation: Validation
	) {}
	async handle(request: ControllerParams<EmployeeModel>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
			let uploader: Uploader = null as any
			if (request.photo && typeof request.photo != 'string') {
				uploader = new UploadService(request.photo, '/employees')
			}
			const createdEmployee = await this.addEmployee.add(
				{
					...request,
					dateOfBirth: DateUtils.convertToDate(request.dateOfBirth),
					countryId: NumberUtils.convertToNumber(request.countryId),
					provinceId: NumberUtils.convertToNumber(request.provinceId, true),
					municipalityId: NumberUtils.convertToNumber(request.municipalityId, true),
					dependents: NumberUtils.convertToNumber(request.dependents),
					baseSalary: NumberUtils.convertToNumber(request.baseSalary),
					canLogin: !!request.canLogin,
					hireDate: DateUtils.convertToDate(request.hireDate),
					contractEndDate: DateUtils.convertToDate(request.contractEndDate),
					createdById: NumberUtils.convertToNumber(request.accountId)
				},
				uploader
			)

			if (createdEmployee == 'emailInUse') {
				return forbidden(new EmailInUseError())
			}
			if (createdEmployee == 'documentInUse') {
				return forbidden(new DocumentInUseError())
			}
			return ok(createdEmployee)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
