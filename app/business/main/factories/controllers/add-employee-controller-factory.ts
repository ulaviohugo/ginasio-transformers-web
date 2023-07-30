import { AddEmployeeController } from '@/app/business/presentation/controllers'
import { Controller } from '@/app/business/presentation/protocols'
import { makeAddEmployeeValidation } from '.'
import { makeAddEmployee } from '..'

export const makeAddEmployeeController = (): Controller => {
  return new AddEmployeeController(
    makeAddEmployee(),
    makeAddEmployeeValidation()
  )
}
