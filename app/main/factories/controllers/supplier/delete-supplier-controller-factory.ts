import { DeleteSupplierController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { NumberGreaterThanValidation } from '@/app/validation/validators'
import { makeDeleteSupplier } from '../..'

export const makeDeleteSupplierController = (): Controller => {
	return new DeleteSupplierController(
		makeDeleteSupplier(),
		new NumberGreaterThanValidation('id', 0)
	)
}
