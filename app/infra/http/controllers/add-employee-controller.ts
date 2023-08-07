import { AddEmployee } from '@/app/domain/usecases'
import { DocumentInUseError, EmailInUseError } from '../errors'
import { badRequest, forbidden, ok, serverError } from '../helper'
import { Controller, HttpResponse, Validation } from '../protocols'
import { Employee } from '@/app/domain/models'

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
				dependents: Number(request.dependents),
				baseSalary: Number(request.baseSalary)
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
