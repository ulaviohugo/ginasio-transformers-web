import { UpdateCustomerController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeUpdateCustomerValidation } from '.'
import { makeUpdateCustomer } from '@/main/factories'

export const makeUpdateCustomerController = (): Controller => {
	return new UpdateCustomerController(
		makeUpdateCustomer(),
		makeUpdateCustomerValidation()
	)
}
