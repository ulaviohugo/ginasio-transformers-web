import { DeleteEmployee } from '../../domain/usecases'
import { badRequest, notFound, ok, serverError } from '../helper'
import { Controller, HttpResponse, Validation } from '../protocols'

export class DeleteEmployeeController implements Controller {
  constructor(
    private readonly deleteEmployee: DeleteEmployee,
    private readonly validation: Validation
  ) {}

  async handle({ id }: DeleteEmployeeControllerRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate({ id })
      if (error) {
        return badRequest(error)
      }
      const result = await this.deleteEmployee.delete(Number(id))
      if (result === null) {
        return notFound()
      }
      return ok({ message: 'Registo excluído com sucesso.' })
    } catch (error) {
      return serverError(error)
    }
  }
}

type DeleteEmployeeControllerRequest = {
  id: number
}
