import { DeleteEmployeeController } from '@/app/business/presentation/controllers'
import { Controller } from '@/app/business/presentation/protocols'
import { makeDeleteEmployee } from '..'
import { GreaterThanValidation } from '@/app/business/validation/validators'

export const makeDeleteEmployeeController = (): Controller => {
  return new DeleteEmployeeController(
    makeDeleteEmployee(),
    new GreaterThanValidation('id', 0)
  )
}
