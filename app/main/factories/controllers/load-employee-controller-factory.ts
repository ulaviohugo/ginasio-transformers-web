import { LoadEmployeeController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { makeLoadEmployee } from '../usecases'

export const makeLoadEmployeeController = (): Controller => {
	return new LoadEmployeeController(makeLoadEmployee())
}
