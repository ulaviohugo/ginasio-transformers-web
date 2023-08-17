import { Controller } from '@/app/infra/http/protocols'
import { makeAddSupplierValidation } from '..'
import { makeAddSupplier } from '../..'
import { AddSupplierController } from '@/app/infra/http/controllers'

export const makeAddSupplierController = (): Controller => {
	return new AddSupplierController(makeAddSupplier(), makeAddSupplierValidation())
}
