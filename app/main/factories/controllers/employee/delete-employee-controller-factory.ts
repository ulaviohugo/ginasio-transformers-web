import { DeleteEmployeeController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { NumberGreaterThanValidation } from '@/validation/validators'
import { makeDeleteEmployee } from '@/main/factories'

export const makeDeleteEmployeeController = (): Controller => {
	return new DeleteEmployeeController(
		makeDeleteEmployee(),
		new NumberGreaterThanValidation('id', 0)
	)
}
