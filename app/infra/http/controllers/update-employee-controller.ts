import { UpdateEmployee } from '@/app/domain/usecases'
import { DocumentInUseError, EmailInUseError } from '../errors'
import { badRequest, forbidden, notFound, ok, serverError } from '../helper'
import { Controller, HttpResponse, Validation } from '../protocols'
import { Employee } from '@/app/domain/models'
import { DateUtils, NumberUtils } from '@/app/utils'

export class UpdateEmployeeController implements Controller {
	constructor(
		private readonly UpdateEmployee: UpdateEmployee,
		private readonly validation: Validation
	) {}
	async handle(request: UpdateEmployeeControllerRequest): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
			const updatedEmployee = await this.UpdateEmployee.update({
				...request,
				id: NumberUtils.convertToNumber(request.id),
				dateOfBirth: DateUtils.convertToDate(request.dateOfBirth),
				countryId: NumberUtils.convertToNumber(request.countryId),
				provinceId: NumberUtils.convertToNumber(request.provinceId, true),
				municipalityId: NumberUtils.convertToNumber(request.municipalityId, true),
				dependents: NumberUtils.convertToNumber(request.dependents),
				baseSalary: NumberUtils.convertToNumber(request.baseSalary),
				hireDate: DateUtils.convertToDate(request.hireDate),
				contractEndDate: DateUtils.convertToDate(request.contractEndDate)
			})
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
			return serverError(error)
		}
	}
}

export type UpdateEmployeeControllerRequest = Employee
