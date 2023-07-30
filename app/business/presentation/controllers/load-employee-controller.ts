import { LoadEmployees } from '../../domain/usecases'
import { ok, serverError } from '../helper'
import { Controller, HttpResponse } from '../protocols'

export class LoadEmployeeController implements Controller {
  constructor(private readonly loadEmployee: LoadEmployees) {}
  async handle(): Promise<HttpResponse> {
    try {
      const data = await this.loadEmployee.load()
      return ok(data)
    } catch (error) {
      return serverError(error)
    }
  }
}
