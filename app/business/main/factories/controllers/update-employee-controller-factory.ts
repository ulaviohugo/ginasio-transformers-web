import { UpdateEmployeeController } from '@/app/business/presentation/controllers'
import { Controller } from '@/app/business/presentation/protocols'
import { makeUpdateEmployeeValidation } from '.'
import { makeUpdateEmployee } from '..'

export const makeUpdateEmployeeController = (): Controller => {
  return new UpdateEmployeeController(
    makeUpdateEmployee(),
    makeUpdateEmployeeValidation()
  )
}
