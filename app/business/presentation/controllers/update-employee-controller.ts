import { Employee } from '../../domain/models'
import { UpdateEmployee } from '../../domain/usecases'
import { EmailInUseError } from '../errors'
import { badRequest, forbidden, notFound, ok, serverError } from '../helper'
import { Controller, HttpResponse, Validation } from '../protocols'

export class UpdateEmployeeController implements Controller {
  constructor(
    private readonly UpdateEmployee: UpdateEmployee,
    private readonly validation: Validation
  ) {}
  async handle(
    request: UpdateEmployeeControllerRequest
  ): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const updatedEmployee = await this.UpdateEmployee.update({
        ...request,
        id: Number(request.id),
      })
      if (updatedEmployee == 'notFound') {
        return notFound()
      }
      if (updatedEmployee == 'emailInUse') {
        return forbidden(new EmailInUseError())
      }

      return ok(updatedEmployee)
    } catch (error) {
      return serverError(error)
    }
  }
}

export type UpdateEmployeeControllerRequest = Employee
