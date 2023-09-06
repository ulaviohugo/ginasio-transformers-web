import { DeleteCategoryController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { NumberGreaterThanValidation } from '@/validation/validators'
import { makeDeleteCategory } from '@/main/factories'

export const makeDeleteCategoryController = (): Controller => {
	return new DeleteCategoryController(
		makeDeleteCategory(),
		new NumberGreaterThanValidation('id', 0)
	)
}
