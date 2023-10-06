import { LoadCustomerController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeLoadCustomer } from '@/main/factories'

export const makeLoadCustomerController = (): Controller => {
	return new LoadCustomerController(makeLoadCustomer())
}
