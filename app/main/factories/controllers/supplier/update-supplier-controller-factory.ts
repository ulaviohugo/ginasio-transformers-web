import { UpdateSupplierController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { makeUpdateSupplierValidation } from '.'
import { makeUpdateSupplier } from '../..'

export const makeUpdateSupplierController = (): Controller => {
	return new UpdateSupplierController(
		makeUpdateSupplier(),
		makeUpdateSupplierValidation()
	)
}
