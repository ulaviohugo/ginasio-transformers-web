import { Controller } from '@/infra/http/protocols'
import { makeAddEmployeeValidation } from '.'
import { makeAddEmployee } from '@/main/factories'
import { AddEmployeeController } from '@/infra/http/controllers'

export const makeAddEmployeeController = (): Controller => {
	return new AddEmployeeController(makeAddEmployee(), makeAddEmployeeValidation())
}
