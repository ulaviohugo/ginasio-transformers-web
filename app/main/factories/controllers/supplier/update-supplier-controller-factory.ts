import { UpdateSupplierController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeUpdateSupplierValidation } from '.'
import { makeUpdateSupplier } from '../..'

export const makeUpdateSupplierController = (): Controller => {
	return new UpdateSupplierController(
		makeUpdateSupplier(),
		makeUpdateSupplierValidation()
	)
}
