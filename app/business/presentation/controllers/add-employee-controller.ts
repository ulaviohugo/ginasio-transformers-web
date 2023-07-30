import { Employee } from '../../domain/models'
import { AddEmployees } from '../../domain/usecases'
import { forbidden, ok, serverError } from '../helper'
import { Controller, HttpResponse } from '../protocols'

export class AddEmployeeController implements Controller {
  constructor(private readonly loadEmployee: AddEmployees) {}
  async handle(request: AddEmployeeControllerRequest): Promise<HttpResponse> {
    try {
      const data = await this.loadEmployee.add(request)
      if (!data) return forbidden(new Error('O e-mail já existe'))
      return ok(data)
    } catch (error) {
      return serverError(error)
    }
  }
}

export type AddEmployeeControllerRequest = Employee
