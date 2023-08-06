import { UpdateEmployeeController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { makeUpdateEmployeeValidation } from '.'
import { makeUpdateEmployee } from '..'

export const makeUpdateEmployeeController = (): Controller => {
	return new UpdateEmployeeController(
		makeUpdateEmployee(),
		makeUpdateEmployeeValidation()
	)
}
