import { DeleteEmployeeController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { NumberGreaterThanValidation } from '@/app/validation/validators'
import { makeDeleteEmployee } from '../..'

export const makeDeleteEmployeeController = (): Controller => {
	return new DeleteEmployeeController(
		makeDeleteEmployee(),
		new NumberGreaterThanValidation('id', 0)
	)
}
