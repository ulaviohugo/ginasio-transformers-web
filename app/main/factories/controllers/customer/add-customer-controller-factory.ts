import { Controller } from '@/app/infra/http/protocols'
import { makeAddCustomer } from '@/app/main/factories'
import { AddCustomerController } from '@/app/infra/http/controllers'
import { makeAddCustomerValidation } from '.'

export const makeAddCustomerController = (): Controller => {
	return new AddCustomerController(makeAddCustomer(), makeAddCustomerValidation())
}
