import { UpdateEmployeeController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeUpdateEmployeeValidation } from '.'
import { makeUpdateEmployee } from '@/main/factories'

export const makeUpdateEmployeeController = (): Controller => {
	return new UpdateEmployeeController(
		makeUpdateEmployee(),
		makeUpdateEmployeeValidation()
	)
}
