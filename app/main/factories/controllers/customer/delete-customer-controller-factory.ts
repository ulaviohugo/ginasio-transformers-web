import { DeleteCustomerController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { NumberGreaterThanValidation } from '@/app/validation/validators'
import { makeDeleteCustomer } from '@/app/main/factories'

export const makeDeleteCustomerController = (): Controller => {
	return new DeleteCustomerController(
		makeDeleteCustomer(),
		new NumberGreaterThanValidation('id', 0)
	)
}
