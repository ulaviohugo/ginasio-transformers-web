import { Controller } from '@/app/infra/http/protocols'
import { makeAddEmployeeValidation } from '.'
import { makeAddEmployee } from '..'
import { AddEmployeeController } from '@/app/infra/http/controllers'

export const makeAddEmployeeController = (): Controller => {
	return new AddEmployeeController(makeAddEmployee(), makeAddEmployeeValidation())
}
