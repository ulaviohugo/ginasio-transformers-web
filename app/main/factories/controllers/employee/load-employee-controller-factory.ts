import { LoadEmployeeController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeLoadEmployee } from '../..'

export const makeLoadEmployeeController = (): Controller => {
	return new LoadEmployeeController(makeLoadEmployee())
}
