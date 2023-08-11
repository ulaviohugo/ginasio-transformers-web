import { AddEmployee } from '@/app/domain/usecases'
import { DocumentInUseError, EmailInUseError } from '../errors'
import { badRequest, forbidden, ok, serverError } from '../helper'
import { Controller, HttpResponse, Validation } from '../protocols'
import { Employee } from '@/app/domain/models'
import { DateUtils, NumberUtils } from '@/app/utils'

export class AddEmployeeController implements Controller {
	constructor(
		private readonly addEmployee: AddEmployee,
		private readonly validation: Validation
	) {}
	async handle(request: AddEmployeeControllerRequest): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
			const createdEmployee = await this.addEmployee.add({
				...request,
				dateOfBirth: DateUtils.convertToDate(request.dateOfBirth),
				countryId: NumberUtils.convertToNumber(request.countryId),
				provinceId: NumberUtils.convertToNumber(request.provinceId, true),
				municipalityId: NumberUtils.convertToNumber(request.municipalityId, true),
				dependents: NumberUtils.convertToNumber(request.dependents),
				baseSalary: NumberUtils.convertToNumber(request.baseSalary),
				hireDate: DateUtils.convertToDate(request.hireDate),
				contractEndDate: DateUtils.convertToDate(request.contractEndDate)
			})

			if (createdEmployee == 'emailInUse') {
				return forbidden(new EmailInUseError())
			}
			if (createdEmployee == 'documentInUse') {
				return forbidden(new DocumentInUseError())
			}
			return ok(createdEmployee)
		} catch (error) {
			return serverError(error)
		}
	}
}

export type AddEmployeeControllerRequest = Employee
