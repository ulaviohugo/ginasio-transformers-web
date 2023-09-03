import { CountCustomerController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { makeCountCustomer } from '@/app/main/factories'

export const makeCountCustomerController = (): Controller => {
	return new CountCustomerController(makeCountCustomer())
}
