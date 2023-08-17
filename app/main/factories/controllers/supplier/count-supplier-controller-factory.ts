import { CountSupplierController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { makeCountSupplier } from '../..'

export const makeCountSupplierController = (): Controller => {
	return new CountSupplierController(makeCountSupplier())
}
