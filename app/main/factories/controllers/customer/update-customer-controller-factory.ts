import { UpdateCustomerController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { makeUpdateCustomerValidation } from '.'
import { makeUpdateCustomer } from '@/app/main/factories'

export const makeUpdateCustomerController = (): Controller => {
	return new UpdateCustomerController(
		makeUpdateCustomer(),
		makeUpdateCustomerValidation()
	)
}
