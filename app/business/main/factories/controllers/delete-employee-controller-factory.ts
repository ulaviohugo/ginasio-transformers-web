import { DeleteEmployeeController } from '@/app/business/presentation/controllers'
import { Controller } from '@/app/business/presentation/protocols'
import { makeDeleteEmployee } from '..'

export const makeDeleteEmployeeController = (): Controller => {
  return new DeleteEmployeeController(makeDeleteEmployee())
}
