import { DeleteCustomerController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { NumberGreaterThanValidation } from '@/validation/validators'
import { makeDeleteCustomer } from '@/main/factories'

export const makeDeleteCustomerController = (): Controller => {
	return new DeleteCustomerController(
		makeDeleteCustomer(),
		new NumberGreaterThanValidation('id', 0)
	)
}
