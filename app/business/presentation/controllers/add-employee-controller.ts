import { Employee } from '../../domain/models'
import { AddEmployee } from '../../domain/usecases'
import { badRequest, forbidden, ok, serverError } from '../helper'
import { Controller, HttpResponse, Validation } from '../protocols'

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
      const createdEmployee = await this.addEmployee.add(request)
      if (!createdEmployee) return forbidden(new Error('O e-mail já existe'))

      return ok(createdEmployee)
    } catch (error) {
      return serverError(error)
    }
  }
}

export type AddEmployeeControllerRequest = Employee
