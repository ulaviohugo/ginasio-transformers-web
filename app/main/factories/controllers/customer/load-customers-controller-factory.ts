import { LoadCustomerController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { makeLoadCustomer } from '@/app/main/factories'

export const makeLoadCustomerController = (): Controller => {
	return new LoadCustomerController(makeLoadCustomer())
}
