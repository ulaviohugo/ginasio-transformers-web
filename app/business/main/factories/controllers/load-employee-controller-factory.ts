import { LoadEmployeeController } from '@/app/business/presentation/controllers'
import { Controller } from '@/app/business/presentation/protocols'
import { makeLoadEmployee } from '../usecases'

export const makeLoadEmployeeController = (): Controller => {
  return new LoadEmployeeController(makeLoadEmployee())
}
