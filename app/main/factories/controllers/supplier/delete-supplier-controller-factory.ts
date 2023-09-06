import { DeleteSupplierController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { NumberGreaterThanValidation } from '@/validation/validators'
import { makeDeleteSupplier } from '../..'

export const makeDeleteSupplierController = (): Controller => {
	return new DeleteSupplierController(
		makeDeleteSupplier(),
		new NumberGreaterThanValidation('id', 0)
	)
}
