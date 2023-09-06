import { CountSupplierController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeCountSupplier } from '../..'

export const makeCountSupplierController = (): Controller => {
	return new CountSupplierController(makeCountSupplier())
}
