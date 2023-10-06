import { CountCustomerController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeCountCustomer } from '@/main/factories'

export const makeCountCustomerController = (): Controller => {
	return new CountCustomerController(makeCountCustomer())
}
