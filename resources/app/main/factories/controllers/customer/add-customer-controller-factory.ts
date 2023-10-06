import { Controller } from '@/infra/http/protocols'
import { makeAddCustomer } from '@/main/factories'
import { AddCustomerController } from '@/infra/http/controllers'
import { makeAddCustomerValidation } from '.'

export const makeAddCustomerController = (): Controller => {
	return new AddCustomerController(makeAddCustomer(), makeAddCustomerValidation())
}
