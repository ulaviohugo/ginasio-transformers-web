import { DeleteEmployee } from '../../domain/usecases'
import { ok, serverError } from '../helper'
import { Controller, HttpResponse } from '../protocols'

export class DeleteEmployeeController implements Controller {
  constructor(private readonly deleteEmployee: DeleteEmployee) {}

  async handle({ id }: DeleteEmployeeControllerRequest): Promise<HttpResponse> {
    try {
      await this.deleteEmployee.delete(Number(id))
      return ok({ message: 'Registo excluído com sucesso.' })
    } catch (error) {
      return serverError(error)
    }
  }
}

type DeleteEmployeeControllerRequest = {
  id: number
}
