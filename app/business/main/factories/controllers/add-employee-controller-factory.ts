import { AddEmployeeController } from '@/app/business/presentation/controllers'
import { Controller } from '@/app/business/presentation/protocols'
import { makeAddEmployee } from '../usecases'
import { makeAddEmployeeValidation } from '.'

export const makeAddEmployeeController = (): Controller => {
  return new AddEmployeeController(
    makeAddEmployee(),
    makeAddEmployeeValidation()
  )
}
