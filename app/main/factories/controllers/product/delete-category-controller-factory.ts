import { DeleteProductController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { NumberGreaterThanValidation } from '@/validation/validators'
import { makeDeleteProduct } from '../..'

export const makeDeleteProductController = (): Controller => {
	return new DeleteProductController(
		makeDeleteProduct(),
		new NumberGreaterThanValidation('id', 0)
	)
}
