import { DeleteEmployeeController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { makeDeleteEmployee } from '..'
import { NumberGreaterThanValidation } from '@/app/validation/validators'

export const makeDeleteEmployeeController = (): Controller => {
	return new DeleteEmployeeController(
		makeDeleteEmployee(),
		new NumberGreaterThanValidation('id', 0)
	)
}
