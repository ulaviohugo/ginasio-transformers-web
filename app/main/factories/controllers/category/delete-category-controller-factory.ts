import { DeleteCategoryController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { NumberGreaterThanValidation } from '@/app/validation/validators'
import { makeDeleteCategory } from '../..'

export const makeDeleteCategoryController = (): Controller => {
	return new DeleteCategoryController(
		makeDeleteCategory(),
		new NumberGreaterThanValidation('id', 0)
	)
}
