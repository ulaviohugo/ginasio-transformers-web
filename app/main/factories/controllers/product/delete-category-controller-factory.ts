import { DeleteProductController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { NumberGreaterThanValidation } from '@/app/validation/validators'
import { makeDeleteProduct } from '../..'

export const makeDeleteProductController = (): Controller => {
	return new DeleteProductController(
		makeDeleteProduct(),
		new NumberGreaterThanValidation('id', 0)
	)
}
