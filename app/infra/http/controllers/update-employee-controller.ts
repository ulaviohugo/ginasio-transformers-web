import { UpdateEmployee } from '@/app/domain/usecases'
import { DocumentInUseError, EmailInUseError } from '../errors'
import { badRequest, forbidden, notFound, ok, serverError } from '../helper'
import { Controller, HttpResponse, Validation } from '../protocols'
import { Employee } from '@/app/domain/models'

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
				id: Number(request.id),
				dependents: Number(request.dependents),
				baseSalary: Number(request.baseSalary)
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
