import { Controller } from '@/infra/http/protocols'
import { makeAddSupplierValidation } from '..'
import { makeAddSupplier } from '../..'
import { AddSupplierController } from '@/infra/http/controllers'

export const makeAddSupplierController = (): Controller => {
	return new AddSupplierController(makeAddSupplier(), makeAddSupplierValidation())
}
